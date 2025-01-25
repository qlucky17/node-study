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
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const projects = {
    'temporary-component': 'E:/projects/fnsz/temporary-component',
    'site-component-PC': 'E:/projects/fnsz/site-component-PC',
    'site-PC': 'E:/projects/fnsz/site-PC',
};
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        utils_1.logger.info('------ 项目处理开始temporary-component ------');
        const project1 = projects['temporary-component'];
        yield (0, utils_1.modifyVersion)(project1);
        yield (0, utils_1.build)(project1);
        yield (0, utils_1.modifyDist)(project1);
        // publish(project1);
        utils_1.logger.info('------ 项目处理结束temporary-component ------');
        utils_1.logger.info('------ 项目处理开始site-component-PC ------');
        const project2 = projects['site-component-PC'];
        const version = yield (0, utils_1.modifyVersion)(project2, {
            'temporary-component': 'file:' + projects['temporary-component']
        });
        yield (0, utils_1.build)(project2);
        yield (0, utils_1.modifyDist)(project2);
        // await publish(project2);
        utils_1.logger.info('------ 项目处理结束site-component-PC ------');
        utils_1.logger.info('------ 项目处理开始site-PC ------');
        const project3 = projects['site-PC'];
        yield (0, utils_1.modifyVersion)(project3, {
            'site-component-pc': version
        });
        utils_1.logger.info('------ 项目处理结束site-PC ------');
    }
    catch (error) {
        console.log(error);
    }
});
run();
