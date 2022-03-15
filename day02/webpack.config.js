const path = require('path');

module.exports = {
    name: 'wordrelay-setting',
    mode: 'development', // production
    // devtool: 'eval', // 빠르게
    resolve: {
      extensions: ['.js', '.jsx']  // 웹팩에서 찾을 확장자
    },
    
    entry: {
      app: ['./client'], // client.jsx가 WordRelay.jsx를 포함하고 있어서 둘다 작성할 필요 없음  
    }, // 입력
    
    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties'],
            }
        }],
    },
    
    output: {
      path: path.join(__dirname, 'dist'), // __dirname 현재 파일 경로 + /dist
      filename: 'app.js'  
    }, // 출력
};

// webpack 명령어를 실행하는 방법 (3)
// 1. package.json에 등록
// 2. npx webpack 실행
// 3. 명령어에 webpack 등록 