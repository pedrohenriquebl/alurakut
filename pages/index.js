import React from 'react';
import styled from 'styled-components'
import MainGrid from "../src/componentes/MainGrid"
import Box from "../src/componentes/Box"
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/componentes/profileRelations";



function ProfileSideBar (propriedades) {
  return (
    <Box as="aside">        
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px'}}/>
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
  }]); 
  // const comunidades = ['Alurakut'];
  // const comunidades = comunidades[0];
  //const alteradorComunidade/setComunidades = comunidade[1];
  const pessoasFavoritas = [
    'texboy',     
    'pragdave',
    'andyhunt',
    'peas',
    'juunegreiros',
    'omariosouto'
  ]

  return (
  <>
    <AlurakutMenu />
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
              }
              const comunidadesAtualizadas = [...comunidades, comunidade]
              setComunidades(comunidadesAtualizadas);
            }}>
            <div>
              <input 
                placeholder="Qual será sua comunidade?" 
                name="title" 
                aria-label="Qual será sua comunidade?"
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
      </div>
      <div className="profileRelationsArea"  style={{ gridArea: 'profileRelationsArea' }}> 
      <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Comunidades ({comunidades.length})
          </h2>
          <ul>
            {comunidades.map((itemAtual) => {
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
      <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle" >
          Pessoas da comunidade ({pessoasFavoritas.length})
        </h2>
        
        <ul>
          {pessoasFavoritas.map((itemAtual) => {
            return(
              <li key={itemAtual}>
                <a href={`/users/${itemAtual}`}>
                  <img src={`https://github.com/${itemAtual}.png`}/>
                  <span> {itemAtual} </span>
                </a>
              </li>
            )          
          })}
        </ul>
      </ProfileRelationsBoxWrapper> 
      </div>  
    </MainGrid>
  </>
  )
}
