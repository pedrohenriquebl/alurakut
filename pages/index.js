import React from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import jwt from 'jsonwebtoken'
import { motion } from "framer-motion";
import styled from 'styled-components'
import MainGrid from "../src/componentes/MainGrid"
import Box from "../src/componentes/Box"
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/componentes/profileRelations";



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
          <li key={itemAtual.login}>
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
  
  return (
    <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">
      {propriedades.titleText} ({propriedades.stateArray.length})
    </h2>
    <ul>
      {propriedades.stateArray.map((itemAtual) => {  
        return(
          <li key={itemAtual.imageUrl}>
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

function ScrapBox (propriedades) {
  return (
    <Box as="main">
      <h2 className="smallTitle">
        {propriedades.titleText} 
      </h2>
      <ul>
        {propriedades.stateArray.map((itemAtual) =>{
          return (
            <li key={itemAtual.title}>
              <img src={itemAtual.imageUrl}/>
              <span>{itemAtual.text}</span>
            </li>
          )
        })}
      </ul>
    </Box>
  )
}


export default function Home(props) {   
  
  const githubUser = props.githubUser;  
  const [comunidades, setComunidades] = React.useState([]);
  React.useEffect(function() {

    fetch(
      'https://graphql.datocms.com/',    
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': '16173d7e71176f442dff40a8307da6',
      },
      body: JSON.stringify({
        query: '{allCommunities {id, imageUrl, title, creatorSlug} }'
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

  // maneiras de fazer a promisse com sync e await, substituindo concatencao de then;

  // await fetch('https://api.github.com/pedrohenriquebl/followers')
  //.then(async function(response){
  //  const resposta = awai response.json()
  // console.log(resposta)
  // console.log('pós response')
  //})
   
  // const comunidades = ['Alurakut'];
  // const comunidades = comunidades[0];
  //const alteradorComunidade/setComunidades = comunidade[1];
  const [scrapsAtuais, setScraps] = React.useState([]);
  React.useEffect(function() {
   
    fetch(
      'https://graphql.datocms.com/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': '16173d7e71176f442dff40a8307da6',
        },
        body: JSON.stringify({
          query: '{allScraps {title, text, imageUrl}}'
        }),
      }
    )
    .then(function(respostaDoServidor){
      return respostaDoServidor.json();
    })
    .then(function (respostaCompleta){
      setScraps(respostaCompleta.data.allScraps);
    })
  },[])


  const [pessoasFavoritas, setPessoasFavoritas] = React.useState([]);
  React.useEffect(function () {    
    
    fetch(
      'https://graphql.datocms.com/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': '16173d7e71176f442dff40a8307da6',
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
                  title: dadosDoForm.get('title'),
                  imageUrl: dadosDoForm.get('image'),
                  creatorSlug: githubUser,
              }

              fetch('/api/comunidade', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json();
                
                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas)
              })

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
 
            <button>
              Criar comunidade
            </button>
          </form>
        </Box>
        <Box>
            <h2 className="subTitle" style={{textAlign:'center', color:'#D82110', fontWeight:'bold', textDecorationLine: 'underline'}}>Deixe aqui seu SCRAP ;)</h2>
            <form onSubmit={function handleCreateScrap(e){
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);
              
              const scrap = {                 
                  title: dadosDoForm.get('title'),
                  text: dadosDoForm.get('text'),
                  imageUrl: dadosDoForm.get('imageUrl'),                  
              }

              fetch('api/scrap', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(scrap)
              })
              .then(async (response) => {
                const dados = await response.json();
                
                const scrap = dados.registroCriado;
                const scrapsAtualizados = [...scrapsAtuais, scrap];
                setScraps(scrapsAtualizados)
              })

            }}>
            <div>
              <input 
                placeholder="Deixe aqui seu link github ou digite seu nome" 
                name="title" 
                aria-label="Qual será o seu scrap?"
                type="text"
              />  
            </div>
            <div> 
              <input 
                placeholder="Digite sua mensagem" 
                name="title" 
                aria-label="Escreva aqui sua mensagem"
                type="text"
              />          
            </div>
            <div> 
              <input 
                placeholder="Deixe o link da sua imagem" 
                name="image" 
                aria-label="Coloque aqui o link da sua imagem"
                type="text"
              />          
            </div>
            <button>
              Enviar SCRAP
            </button>
          </form>
        </Box>
        <ScrapBox titleText="Scraps" stateArray={scrapsAtuais}/>
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

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
        Authorization: token
      }
  })
  .then((resposta) => resposta.json())


  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}