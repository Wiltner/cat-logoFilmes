import React, {Component} from 'react';
import axios from 'axios';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      filme:[],
      carregando: false,
      erro: '' 
    };
  }

  adicionarFilme = async() => {
    this.setState({carregando: true, erro:''});

    try{
          const response = await
        axios.get(`http://img.omdbapi.com/?apikey=[129861cc]&`);
      const filme = response.data;
      const novoFilme = {
        titulo: filme.titulo,
        poster: filme.sprites.front_default
      };

      this.setState((prevState) => ({
        filmes: [...prevState.filmes, novoFilme],
        carregando: false
      }));
    }catch(error){
      console.error('Erro ao obter o filme: ', error);
      this.setState({erro: 'Não foi possível obter o filme. Tente novamente.', carregando: false});
    }
  }

  removerFilme = (index) =>{
    this.setState((prevState) =>({
      filmes: prevState.filmes.filter((_, i)=> i !== index)
    }));
  }

  render(){
    const {filmes, carregando, erro} = this.state;

    return(
      <div>
        <h1>Filmes aleatórios para se divertir assistindo</h1>
        <button onClick={this.adicionarFilme} disabled={carregando}>{carregando ? 'Carregandoooo' : 'Escolher filme'}</button>
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        <ul>
          {filmes.length > 0 ? (
            filmes.map((filme, index) => (
              <li key={index}>
                <strong>{filme.titulo}</strong>
                <img src={filme.poster} alt={filme.titulo} width="100"></img>
                <button onClick={()=>this.removerFilme(index)}>Remover</button>
              </li>
            ))
          ):(
            <li>Adicione um filme aleatório para assistir!</li>
          )}
        </ul>
      </div>
    )
  }
}
export default App;