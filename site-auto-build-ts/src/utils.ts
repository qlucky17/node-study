import path from 'path';
import { readFile, writeFile, readdir } from 'fs/promises';
import { exec, spawn } from 'child_process';
import readline from 'readline/promises';
import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: './logs/history.log', level: 'info' }),
    new winston.transports.Console()
  ]
});

export const modifyVersion = async (projectPath: any, externalKeyMaps?: any) => {
  const filePath = path.join(projectPath, 'package.json');
  const fileCont = await readFile(filePath, { encoding: 'utf8' });
  const packageJson = JSON.parse(fileCont);

  const reg = /^(\d+)\.(\d+)\.(\d+)(-.+)?$/;
  let [_, major, minor, patch, suffix] = packageJson.version.match(reg);
  major = parseInt(major, 10);
  minor = parseInt(minor, 10);
  patch = parseInt(patch, 10);
  if (patch === 99) {
    patch = 0;
    minor += 1;
  } else {
    patch += 1;
  }
  const version = `${major}.${minor}.${patch}${suffix || ''}`;
  packageJson.version = version;
  if(externalKeyMaps){
    for(let key in externalKeyMaps){
      packageJson['dependencies'][key] = externalKeyMaps[key];
    }
  }

  await writeFile(filePath, JSON.stringify(packageJson, null, 2), 'utf8');
  console.log('版本号修改成功：', version);
  return version;
}

export const build = (projectPath: any) => {
  return new Promise((resolve, reject) => {
    // exec(`cd ${projectPath} && npm run build`, (error, stdout, stderr) => {
    //   if(error){
    //     reject(error.message);
    //   }
    //   console.log('构建成功');
    //   resolve(stdout)
    // });

    let error = '';
    const command = spawn('npm', ['run', 'build'], {
      cwd: projectPath,
      shell: true
    });
  
    command.stderr.on('data', (data: any) => {
      error += data.toString();
    });
  
    command.on('close', (code: number) => {
      if(code == 0){
        console.log('构建成功');
        resolve('');
      } else {
        console.log(`构建失败${code}`);
        reject(error);
      }
    });  
  })
}

export const modifyDist = async (projectPath: any) => {
  const distPath = path.join(projectPath, 'dist');
  const files = await readdir(distPath);
  const filterFiles = files?.filter((file: string) => ['.js', '.mjs']?.includes(path.extname(file)));
  for (const file of filterFiles){
    const filePath = path.join(distPath, file)
    const fileCont = await readFile(filePath, { encoding: 'utf8' });
    let isMatch = false;
    const newFileCont = fileCont.replace(
      /import\s+([\w$]+)\s*,\s*{([^}]*)}\s*from\s+['"]vue['"];/g,
      (match: string, p1: string, p2: string) => {
        if(match) isMatch = true;
        const updaed = `import * as ${p1} from 'vue';\nimport {${p2}} from 'vue';`;
        return updaed;
      }
    );
    if(isMatch){
      console.log('文件修改成功：', filePath);
      await writeFile(filePath, newFileCont, 'utf8');
    }
  }
}

export const publish = async (projectPath: any) => {
  return new Promise((resolve, reject) => {
    let error = '';
    const command = spawn('npm', ['publish'], {
      cwd: projectPath,
      shell: true
    });
  
    command.stderr.on('data', (data: any) => {
      error += data.toString();
    });
  
    command.on('close', (code: number) => {
      if(code == 0){
        console.log('发布成功');
        resolve('');
      } else {
        console.log(`发布失败${code}`);
        reject(error);
      }
    });  
  });
}

export const getEnv = async () => {
  const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const env = await read.question('请输入打包环境：');
  const mode = await read.question('请输入打包模式：');
  read.close();
  return { env, mode};
}
