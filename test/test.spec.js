import KarmaConf from '../karma.conf'

describe('Karma Test', function() {
  it('babel-loader test', function() { 
    expect(typeof KarmaConf).toEqual('function');
  });
});