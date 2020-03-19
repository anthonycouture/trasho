import React from 'react'

class Api extends React.Component{

  constructor(props) {
    super(props);
    this.state  = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result
        });
      },
      // Remarque : il est important de traiter les erreurs ici
      // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
      // des exceptions provenant de réels bugs du composant.
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  render(){
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
        console.log(items)
      return (
        <ul>
          {items.map(item => (
            <li key={item.texte}>
              {item.texte}
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default Api
