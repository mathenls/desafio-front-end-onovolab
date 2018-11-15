import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import StartupList from './components/StartupsList';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter, Route } from 'react-router-dom';

const startups = [{
  "name": "AgroNow",
  "teamCount": 8,
  "description": "A AgroNow nasceu para ajudar a construir o futuro do agronegócio brasileiro, aliando geomonitoramento, inteligência competitiva e ferramentas estratégicas para a melhor gestão do território.",
  "imageUrl": "https://static.wixstatic.com/media/0adf28_eec83b33056243a9a33440a10b5d7afd.png",
  "annualReceipt": 520000,
  "Segment": {
      "name": "AgriTech",
      "code": "AGRITECH"
  }
},
{
  "name": "Hellfire Games",
  "teamCount": 5,
  "description": "Criamos games interativos disponíveis nas plataformas Console e PC para gamers hardcore!",
  "imageUrl": "https://www.eaalim.com/download/wp-content/uploads/2014/01/hellfire.jpg",
  "annualReceipt": 420900,
  "Segment": {
      "name": "Games",
      "code": "GAMES"
  }
},
{
  "name": "Predify",
  "teamCount": 6,
  "description": "Plataforma que oferece ao micro e pequeno empreendedor uma inteligência de negócios de forma intuitiva e eficiente através do entendimento e controle dos números da empresa.",
  "imageUrl": "http://www.sevna.com.br/site/wp-content/uploads/2018/08/MarcasAceleradas_predify.png",
  "annualReceipt": 800000,
  "Segment": {
      "name": "Fintech",
      "code": "FINTECH"
  }
},
{
  "name": "Tech.fit",
  "teamCount": 18,
  "description": "Transformar corpos e mentes, por meio de hábitos saudáveis.",
  "imageUrl": "https://thumb.lovemondays.com.br/image/40fa4baba2854c2fa7399bbb90debcc1/logos/4a835e/techfit.png",
  "annualReceipt": 1495500,
  "Segment": {
      "name": "Health Tech",
      "code": "HEALTH"
  }
}];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter>
                    <App />
                </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
  cleanup();
});

it('renders all startups infos', () => {
const { getByText } = render(
        <BrowserRouter>
          <Route exact path='/' render={() => (
            <StartupList allStartups={startups} />
          )}
          />
        </BrowserRouter>
    );
    for (let startup of startups) {
      expect(getByText(startup.name)).toBeInTheDocument();
      expect(getByText(startup.Segment.name)).toBeInTheDocument();
    }
    cleanup();
});


