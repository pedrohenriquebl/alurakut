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
      url: "https://github.com/texboy.png",
    },
    {
      id:'1145442',
      title: 'pragdave',
      image: 'https://github.com/pragdave.png',
      url: "https://github.com/pragdave.png",     
    },
    {
      id:'45648454',
      title: 'andyhunt',
      image: 'https://github.com/andyhunt.png',
      url: "https://github.com/andyhunt.png",       
    },
    {
      id:'789745454',
      title: 'peas',
      image: 'https://github.com/peas.png',
      url: "https://github.com/peas.png",       
    },
    {
      id:'789754',
      title: 'juunegreiros',
      image: 'https://github.com/juunegreiros.png',
      url: "https://github.com/juunegreiros.png", 
    },
    {
      id:'78785454',
      title: 'omariosouto',
      image: 'https://github.com/omariosouto.png',
      url: "https://github.com/omariosouto.png", 
    },    
]);
  
  return (
  <>
    <AlurakutMenu githubUser={githubUser} />
    <MainGrid>      
      <div className="profileArea" style={{ gridArea: 'profileArea'}}>
        <ProfileSideBar githubUser={githubUser}/> 
      </div>
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
      </div>
      <div className="profileRelationsArea"  style={{ gridArea: 'profileRelationsArea' }}> 
      <CommunityBox titleText="Comunidades" stateArray={comunidades}/>
      <CommunityBox titleText="Pessoas da comunidade" stateArray={pessoasFavoritas}/>
      </div>  
    </MainGrid>
  </>
  )
}
