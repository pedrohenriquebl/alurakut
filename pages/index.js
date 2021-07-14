import React from 'react';
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

function CommunityBox ({ titleText, stateArray }) {
  return (
    <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">
      {titleText} ({stateArray.length})
    </h2>
    <ul>
      {stateArray.map((itemAtual) => {
        return(
          <li key={itemAtual.id}>
            <a href={`/users/${itemAtual.title}`}>
              <img src={itemAtual.image}/>
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
  const [comunidades, setComunidades] = React.useState([{
    id: '45421321215456421321',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',},
    {
    id: '4545454542',
    title: 'Colera do Dragão no banheiro',
    image: 'https://i.ibb.co/y0dtb5R/coleradodragao.png',
    },
    {
      id: '454454545',
      title: 'Cachoeiras e natureza',
      image: 'https://i.ibb.co/99sdKqz/cachoeiras.jpg',
    },
    {
      id: '9898151',
      title: 'Piano e música',
      image: 'https://i.ibb.co/Mh6cr4x/Piano-and-piano-keyboard.jpg',
    },
    {
      id: '787451',
      title: 'Alura',
      image: 'https://i.ibb.co/nw1cQkt/alura.jpg',  
  }]); 
  // const comunidades = ['Alurakut'];
  // const comunidades = comunidades[0];
  //const alteradorComunidade/setComunidades = comunidade[1];
  const [pessoasFavoritas, setPessoasFavoritas] = React.useState([{    
      id:'11111112',
      title: 'texboy',
      image: 'https://github.com/texboy.png',
      url: "https://github.com/texboy",
    },
    {
      id:'1145442',
      title: 'pragdave',
      image: 'https://github.com/pragdave.png',
      url: "https://github.com/pragdave",     
    },
    {
      id:'45648454',
      title: 'andyhunt',
      image: 'https://github.com/andyhunt.png',
      url: "https://github.com/andyhunt",       
    },
    {
      id:'789745454',
      title: 'peas',
      image: 'https://github.com/peas.png',
      url: "https://github.com/peas",       
    },
    {
      id:'789754',
      title: 'juunegreiros',
      image: 'https://github.com/juunegreiros.png',
      url: "https://github.com/juunegreiros", 
    },
    {
      id:'78785454',
      title: 'omariosouto',
      image: 'https://github.com/omariosouto.png',
      url: "https://github.com/omariosouto", 
    },    
]);
  
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
  </>
  )
}
