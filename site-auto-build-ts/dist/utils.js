"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = exports.publish = exports.modifyDist = exports.build = exports.modifyVersion = exports.logger = void 0;
const path_1 = __importDefault(require("path"));
const promises_1 = require("fs/promises");
const child_process_1 = require("child_process");
const promises_2 = __importDefault(require("readline/promises"));
const winston_1 = __importDefault(require("winston"));
exports.logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston_1.default.transports.File({ filename: './logs/error.log', level: 'error' }),
        new winston_1.default.transports.File({ filename: './logs/history.log', level: 'info' }),
        new winston_1.default.transports.Console()
    ]
});
const modifyVersion = (projectPath, externalKeyMaps) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = path_1.default.join(projectPath, 'package.json');
    const fileCont = yield (0, promises_1.readFile)(filePath, { encoding: 'utf8' });
    const packageJson = JSON.parse(fileCont);
    const reg = /^(\d+)\.(\d+)\.(\d+)(-.+)?$/;
    let [_, major, minor, patch, suffix] = packageJson.version.match(reg);
    major = parseInt(major, 10);
    minor = parseInt(minor, 10);
    patch = parseInt(patch, 10);
    if (patch === 99) {
        patch = 0;
        minor += 1;
    }
    else {
        patch += 1;
    }
    const version = `${major}.${minor}.${patch}${suffix || ''}`;
    packageJson.version = version;
    if (externalKeyMaps) {
        for (let key in externalKeyMaps) {
            packageJson['dependencies'][key] = externalKeyMaps[key];
        }
    }
    yield (0, promises_1.writeFile)(filePath, JSON.stringify(packageJson, null, 2), 'utf8');
    console.log('版本号修改成功：', version);
    return version;
});
exports.modifyVersion = modifyVersion;
const build = (projectPath) => {
    return new Promise((resolve, reject) => {
        // exec(`cd ${projectPath} && npm run build`, (error, stdout, stderr) => {
        //   if(error){
        //     reject(error.message);
        //   }
        //   console.log('构建成功');
        //   resolve(stdout)
        // });
        let error = '';
        const command = (0, child_process_1.spawn)('npm', ['run', 'build'], {
            cwd: projectPath,
            shell: true
        });
        command.stderr.on('data', (data) => {
            error += data.toString();
        });
        command.on('close', (code) => {
            if (code == 0) {
                console.log('构建成功');
                resolve('');
            }
            else {
                console.log(`构建失败${code}`);
                reject(error);
            }
        });
    });
};
exports.build = build;
const modifyDist = (projectPath) => __awaiter(void 0, void 0, void 0, function* () {
    const distPath = path_1.default.join(projectPath, 'dist');
    const files = yield (0, promises_1.readdir)(distPath);
    const filterFiles = files === null || files === void 0 ? void 0 : files.filter(file => { var _a; return (_a = ['.js', '.mjs']) === null || _a === void 0 ? void 0 : _a.includes(path_1.default.extname(file)); });
    for (const file of filterFiles) {
        const filePath = path_1.default.join(distPath, file);
        const fileCont = yield (0, promises_1.readFile)(filePath, { encoding: 'utf8' });
        let isMatch = false;
        const newFileCont = fileCont.replace(/import\s+([\w$]+)\s*,\s*{([^}]*)}\s*from\s+['"]vue['"];/g, (match, p1, p2) => {
            if (match)
                isMatch = true;
            const updaed = `import * as ${p1} from 'vue';\nimport {${p2}} from 'vue';`;
            return updaed;
        });
        if (isMatch) {
            console.log('文件修改成功：', filePath);
            yield (0, promises_1.writeFile)(filePath, newFileCont, 'utf8');
        }
    }
});
exports.modifyDist = modifyDist;
const publish = (projectPath) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        let error = '';
        const command = (0, child_process_1.spawn)('npm', ['publish'], {
            cwd: projectPath,
            shell: true
        });
        command.stderr.on('data', (data) => {
            error += data.toString();
        });
        command.on('close', (code) => {
            if (code == 0) {
                console.log('发布成功');
                resolve('');
            }
            else {
                console.log(`发布失败${code}`);
                reject(error);
            }
        });
    });
});
exports.publish = publish;
const getEnv = () => __awaiter(void 0, void 0, void 0, function* () {
    const read = promises_2.default.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const env = yield read.question('请输入打包环境：');
    const mode = yield read.question('请输入打包模式：');
    read.close();
    return { env, mode };
});
exports.getEnv = getEnv;
