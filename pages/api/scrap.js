import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response ){

    if (request.method === 'POST'){
        const TOKEN = '9b548f7e4f7e3deee24927bce1437c';

        const client = new SiteClient(TOKEN);
    
        const registroCriado = await client.items.create({
            itemType: "971913", // model ID DATOCMS
            ...request.body,
            // title: "comunidade de teste",
            // imageUrl: "https://github.com/pedrohenriquebl.png",
            // creatorSlug: "pedrohenriquebl",        
        });
    
        console.log(registroCriado);
    
        response.json({
            dados: 'algum dado qualquer',
            registroCriado: registroCriado,
        })
    }
}