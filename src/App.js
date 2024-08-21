import React, {Component} from 'react';
import axios from 'axios';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      filmes:[],
      carregando: false,
      erro: '' 
    };
  }

  adicionarFilme = async() => {
    this.setState({carregando: true, erro:''});

    try{
      const response = await
      axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=129861cc`);
      const filme = response.data;
      const novoFilme = {
        title: filme.Title,
        poster: `${filme.Poster}&h=100`
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
                <strong>{filme.Title}</strong>
                <img src={filme.poster} alt={filme.title}></img>
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