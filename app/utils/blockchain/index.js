import { merge } from 'lodash/object';
import EosApi from 'eosjs-api';

import eosLogo from './logos/eos.png';
import eosKyrinLogo from './logos/eosKyrin.png';
import eosJungleLogo from './logos/eosJungle.png';
import fibosLogo from './logos/fibos.png';
import chainMoeLogo from './logos/chainMoe.png';
import enumivoLogo from './logos/enumivo.png';
import bosLogo from './logos/bos.png';
import meetLogo from './logos/meet.jpg';
import telosLogo from './logos/telos.png';
import worbliLogo from './logos/worbli.jpg';
import forceLogo from './logos/force.png';

function GennerateChain() {
  const listObject = {};
  const listArray = [];
  const path = window.location.pathname.split('/')[1];

  function getObject() {
    return listObject;
  }
  function getArray() {
    return listArray;
  }
  function setCurrent(name) {
    listObject.current = listObject[name];
  }
  function setChain(chainName, chainType) {
    const chain = merge(
      {
        name: '',
        netType: '',
        symbol: '',
        logo: chainMoeLogo,
        endpoint: chainType.endpoints[0],
        endpoints: [],
        bindPath: [],
        extend: {
          contractEosio: 'eosio',
          contractEosioToken: 'eosio.token',
        },
      },
      chainType,
    );
    chain.chain = EosApi({ httpEndpoint: chain.endpoints[0] });
    listObject[chainName] = chain;
    listArray.push(chain);
    if (!listObject.current) {
      setCurrent(chainName);
    }
    chain.bindPath.map(h => h === path && setCurrent(chainName));
  }

  this.setCurrent = setCurrent;
  this.setChain = setChain;
  this.getObject = getObject;
  this.getArray = getArray;
}

const chain = new GennerateChain();

// eos
chain.setChain('eos', {
  name: 'EOS',
  netType: 'Mainnet',
  symbol: 'EOS',
  logo: eosLogo,
  endpoints: [
    'https://proxy.eosnode.tools',
    'https://api.cypherglass.com/',
    'http://api.eosnewyork.io',
    'https://api1.eosasia.one',
    'https://eos.greymass.com',
    'https://history.cryptolions.io',
    'https://eosx-apigw.eosx.io',
  ],
  bindPath: ['eos'],
  extend: {
    coinmarketcapEosUrl: 'https://api.coinmarketcap.com/v2/ticker/1765/',
  },
});

// eos kylin
chain.setChain('eosKylin', {
  name: 'EOS Kylin',
  netType: 'Testnet',
  symbol: 'EOS',
  logo: eosKyrinLogo,
  endpoints: ['https://api-kylin.eoslaomao.com'],
  bindPath: ['eos-kylin'],
});

// eos Jungle
chain.setChain('eosJungle', {
  name: 'EOS Jungle',
  netType: 'Testnet',
  symbol: 'EOS',
  logo: eosJungleLogo,
  endpoints: [
    'https://api.jungle.alohaeos.com',
    'https://junglehistory.cryptolions.io:4433',
    'https://jungle2.cryptolions.io',
  ],
  bindPath: ['eos-jungle'],
});

// fibos
chain.setChain('fibos', {
  name: 'FIBOS',
  netType: 'Mainnet',
  symbol: 'FO',
  logo: fibosLogo,
  endpoints: [
    'https://api.fibos.rocks',
    'https://rpc-mainnet.fibos123.com',
    'https://rpc-mainnet.fibscan.io',
  ],
  bindPath: ['fo'],
  extend: {
    fibosRocksStatsUrl: 'https://explorer.fibos.rocks/api/stats',
  },
});

// fibos testnet
chain.setChain('fibosTest', {
  name: 'FIBOS Test',
  netType: 'Testnet',
  symbol: 'FO',
  logo: fibosLogo,
  endpoints: ['http://api.testnet.fo'],
  bindPath: ['fo-test'],
});

// Enumivo
chain.setChain('enumivo', {
  name: 'Enumivo',
  netType: 'Mainnet',
  symbol: 'ENU',
  logo: enumivoLogo,
  endpoints: ['https://enu.qsx.io'],
  bindPath: ['enu'],
  extend: {
    contractEosio: 'enumivo',
    enumivoExplorerStatsUrl: 'https://enumivo.qsx.io/api/v2/stats',
  },
});

// bos
chain.setChain('bos', {
  name: 'BOS',
  netType: 'Mainnet',
  symbol: 'BOS',
  logo: bosLogo,
  endpoints: ['https://api.bossweden.org'],
  bindPath: ['bos'],
});

// bos testnet
chain.setChain('bosTest', {
  name: 'BOS Test',
  netType: 'Testnet',
  symbol: 'BOS',
  logo: bosLogo,
  endpoints: ['https://bostest.api.blockgo.vip'],
  bindPath: ['bos-test'],
});

// meet
chain.setChain('meet', {
  name: 'MEET',
  netType: 'Mainnet',
  symbol: 'MEET',
  logo: meetLogo,
  endpoints: ['https://fullnode.meet.one'],
  bindPath: ['meet'],
});

// meet test
chain.setChain('meetTest', {
  name: 'MEET Test',
  netType: 'Testnet',
  symbol: 'MEET',
  logo: meetLogo,
  endpoints: ['https://sidechain-test-history.meet.one'],
  bindPath: ['meet-test'],
});

// force
chain.setChain('Force', {
  name: 'Force',
  netType: 'Mainnet',
  symbol: 'EOSC',
  logo: forceLogo,
  endpoints: ['https://explorer.eosforce.io'],
  bindPath: ['force'],
});

// telos
chain.setChain('telos', {
  name: 'Telos',
  netType: 'Mainnet',
  symbol: 'TLOS',
  logo: telosLogo,
  endpoints: ['https://api.eos.miami'],
  bindPath: ['telos'],
});

// telos test
chain.setChain('telosTest', {
  name: 'Telos Test',
  netType: 'Testnet',
  symbol: 'TLOS',
  logo: telosLogo,
  endpoints: ['https://testnet.eos.miami'],
  bindPath: ['telos-test'],
});

// Worbli
chain.setChain('worbli', {
  name: 'Worbli',
  netType: 'Mainnet',
  symbol: 'WBI',
  logo: worbliLogo,
  endpoints: ['https://api.worbli.io'],
  bindPath: ['worbli'],
});

// local
// chain.setChain('local', {
//   name: 'Local',
//   netType: 'Localhost',
//   symbol: 'SYS',
//   endpoints: ['http://localhost:8888'],
//   bindPath: ['local']
// })

const { eos, current } = chain.getObject();
export { eos, current, chain };
