import React from 'react';
import { motion } from "framer-motion";
import styled from 'styled-components'
import MainGrid from "../src/componentes/MainGrid"
import Box from "../src/componentes/Box"
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/componentes/profileRelations";

const token = '16173d7e71176f442dff40a8307da6';

function ProfileSideBar (propriedades) {
  return (

    <Box as="aside">        
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px', border: '2px solid black'}}/>
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
        </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>  
  
  )
}

function ProfileRelationsBox(propriedades){
  return(
    <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">
      {propriedades.title} ({propriedades.items.length})
    </h2>
    <ul>
      {propriedades.items.map((itemAtual) => {
        return(
          <li key={itemAtual.id}>
            <a href={`/users/${itemAtual.login}`}>
              <img src={itemAtual.avatar_url}/>
              <span> {itemAtual.login} </span>
            </a>
          </li>
        )          
      })}
    </ul>
   </ProfileRelationsBoxWrapper> 
  )
}

function CommunityBox (propriedades) {
  console.log(propriedades.stateArray)
  return (
    <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">
      {propriedades.titleText} ({propriedades.stateArray.length})
    </h2>
    <ul>
      {propriedades.stateArray.map((itemAtual) => {  
        return(
          <li key={itemAtual}>
            <a href={`/users/${itemAtual.title}`}>
              <img src={itemAtual.imageUrl}/>
              <span> {itemAtual.title} </span>
            </a>
          </li>
        )          
      })}
    </ul>
  </ProfileRelationsBoxWrapper>
  )
}



export default function Home() {   
  
  const githubUser = "pedrohenriquebl";  
  const [comunidades, setComunidades] = React.useState([]);
  React.useEffect(function() {

    fetch(
      'https://graphql.datocms.com/',    
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: '{allCommunities {id, imageUrl, title} }'
      }),
    } 
  )
  .then(function(respostaDoServidor){
    return respostaDoServidor.json();
  })
  .then(function(respostaCompleta){
    setComunidades(respostaCompleta.data.allCommunities);
  });
}, [])
   
  // const comunidades = ['Alurakut'];
  // const comunidades = comunidades[0];
  //const alteradorComunidade/setComunidades = comunidade[1];
  const [pessoasFavoritas, setPessoasFavoritas] = React.useState([]);
  React.useEffect(function () {    
    
    fetch(
      'https://graphql.datocms.com/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: '{ allFriends {identifier, title, imageUrl, linkUrl } }'
        }),
      }
    )
    
    .then(function(respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta){
      setPessoasFavoritas(respostaCompleta.data.allFriends);

    });
  }, [])
  
//Trabalhando com o fetch (pega uma promessa de dados do servidor)
//retornando uma promessa.
//Ele envelopa os dados como uma promessa, por isso é necessário utilizar
//o .then para que essa promessa seja utilizada.
//os dados são passados pedaço a pedaço, como um streamming de video.
//é necessário utilizar o json para que os dados sejam lidos na transferencia.

// 0 - Pegar o array de dados do github;
const [seguidores, setSeguidores] = React.useState([]);

React.useEffect(function () {    
  fetch('https://api.github.com/users/pedrohenriquebl/followers')
  .then(function (respostaDoServidor){
    return respostaDoServidor.json();
  })
  .then(function(respostaCompleta){
    setSeguidores(respostaCompleta);
  })
}, [])

//1 - criar um box que vai ter um map, baseado nos itens do array
// que pegamos do github;

  return (   
  <>
  <motion.div
    initial={{
      opacity: 0,
      
      y: -300
    }}
    animate={{
      opacity: 1,      
      y: 0
    }}
    transition={{
      duration: 3
    }}
  >
    <AlurakutMenu githubUser={githubUser} />
    <MainGrid>      
      <div className="profileArea" style={{ gridArea: 'profileArea'}}>
        <ProfileSideBar githubUser={githubUser}/> 
      </div>ProfileRelationsBox
      <div className="welcomeArea"  style={{ gridArea: 'welcomeArea' }}>
        <Box>
          <h1 className="title">
            Bem vindo(a)
          </h1>
          <OrkutNostalgicIconSet />
        </Box>          
        <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCreateCommunity(e){
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);
              // comunidades.push('Alura Stars');

              const comunidade = {
                  id: new Date().toISOString(),
                  title: dadosDoForm.get('title'),
                  image: dadosDoForm.get('image'),
                  url: dadosDoForm.get('communityUrl'),
              }
              const comunidadesAtualizadas = [...comunidades, comunidade]
              setComunidades(comunidadesAtualizadas);
            }}>
            <div>
              <input 
                placeholder="Qual será o nome da sua comunidade?" 
                name="title" 
                aria-label="Qual será o nome da sua comunidade?"
                type="text"
              />
            </div>
            <div>
              <input 
                placeholder="Coloque uma URL para usarmos de capa" 
                name="image" 
                aria-label="Coloque uma URL para usarmos de capa"
                type="text"
              />
            </div>
            <div>
              <input
                placeholder="coloque a URL para acessar a comunidade"
                name="communityUrl"
                aria-label="coloque a URL para acessar a comunidade"
              />
            </div>
            <button>
              Criar comunidade
            </button>
          </form>
        </Box>
        <Box>
            <h2 className="subTitle" style={{textAlign:'center', fontWeight:'bold', textDecorationLine: 'underline'}}>Música do Dia</h2>

            <div>
              <ul>
                <li>
              <iframe style={{border:'2px solid red;'}} width="540" height="270" src="https://www.youtube.com/embed/WNcsUNKlAKw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </li>
              </ul>
            </div>         
            <button>
              Like 👍🏻
            </button>
            <button style={{marginLeft:'380px'}}>
              Dislike 👎🏻
            </button>
          
        </Box>
      </div>      
      <div className="profileRelationsArea"  style={{ gridArea: 'profileRelationsArea' }}>
      <ProfileRelationsBox title="Seguidores" items={seguidores}/>
      <CommunityBox titleText="Comunidades" stateArray={comunidades}/>
      <CommunityBox titleText="Pessoas da comunidade" stateArray={pessoasFavoritas}/>     
      </div>  
    </MainGrid>
    </motion.div>
  </>
  )
}
