export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemInstruction = `Tu es l'assistant IA de Zen Gym, une salle de sport et de bien-être haut de gamme en Tunisie. 
    Sois poli, utile et concis. Ton ton est calme, éditorial et élégant (comme une boutique Aesop ou un complexe de luxe). 
    
    Voici les informations que tu dois connaître :
    - Cours : Pilates Conscient, Force & Conditionnement, Flux Dynamique, Restauration Profonde.
    - Tarifs : À la séance (35 DT), Mensuel (150 DT), Annuel (1500 DT). L'abonnement mensuel est le plus populaire.
    - Emplacement : 123 Voie de la Tranquillité, Quartier Sérénité, Tunis.
    - Horaires : Lun-Ven 6h-21h, Sam-Dim 8h-18h.
    - FAQ : Oui, nous avons des douches et des produits de soin haut de gamme. Nous n'avons pas de piscine. 
    
    Encourage toujours gentiment les visiteurs à réserver un essai ou à rejoindre notre communauté s'ils semblent intéressés. Parle toujours en français.`;

    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.MISTRAL_API_KEY}`
      },
      body: JSON.stringify({
        model: "mistral-small-latest", // Use mistral-small-latest for fast chat interactions
        messages: [
          { role: "system", content: systemInstruction },
          ...messages.map((m: any) => ({ role: m.role, content: m.content }))
        ],
        stream: true,
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Mistral API Error:", errorText);
      return new Response("Error processing request", { status: 500 });
    }

    const stream = new ReadableStream({
      async start(controller) {
        if (!response.body) {
          controller.close();
          return;
        }
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          
          // Keep the last partial line in the buffer
          buffer = lines.pop() || "";
          
          for (const line of lines) {
            if (line.trim() === "") continue;
            if (line.startsWith('data: ')) {
              const dataStr = line.slice(6).trim();
              if (dataStr === '[DONE]') continue;
              
              try {
                const data = JSON.parse(dataStr);
                const content = data.choices[0]?.delta?.content;
                if (content) {
                  controller.enqueue(new TextEncoder().encode(content));
                }
              } catch(e) {
                console.error("Error parsing SSE JSON:", e, dataStr);
              }
            }
          }
        }
        controller.close();
      },
    });

    return new Response(stream, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  } catch (error) {
    console.error("API Error:", error);
    return new Response("Error processing request", { status: 500 });
  }
}
