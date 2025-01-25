import { modifyVersion, build, modifyDist, publish, getEnv, logger} from './utils';

const projects = {
  'temporary-component': 'E:/projects/fnsz/temporary-component',
  'site-component-PC': 'E:/projects/fnsz/site-component-PC',
  'site-PC': 'E:/projects/fnsz/site-PC',
}

const run = async () => {
  try {
    logger.info('------ 项目处理开始temporary-component ------');
    const project1 = projects['temporary-component'];
    await modifyVersion(project1);
    await build(project1);
    await modifyDist(project1);
    // publish(project1);
    logger.info('------ 项目处理结束temporary-component ------');

    logger.info('------ 项目处理开始site-component-PC ------');
    const project2 = projects['site-component-PC'];
    const version = await modifyVersion(project2, {
      'temporary-component': 'file:' + projects['temporary-component']
    });
    await build(project2);
    await modifyDist(project2);
    // await publish(project2);
    logger.info('------ 项目处理结束site-component-PC ------');

    logger.info('------ 项目处理开始site-PC ------');
    const project3 = projects['site-PC'];
    await modifyVersion(project3, {
      'site-component-pc': version
    });
    logger.info('------ 项目处理结束site-PC ------');
  } catch (error) {
    console.log(error);
  }
}

run();

