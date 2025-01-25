const { Controller } = require('egg');
/**
 * @Controller 用户管理
 */
class UserController extends Controller {
    constructor(ctx) {
        super(ctx);
    }
    /**
    * @summary 用户页面
    * @description 用户页面
    * @router get /user
    * @response 200 baseResponse 操作成功
    */
    async index() {
        const { ctx } = this;
        ctx.body = 'hi, user';
    }


    /**
    * @summary 创建用户
    * @description 创建用户，记录用户账户/密码/类型
    * @router post /api/user
    * @request body createUserRequest *body
    * @response 200 baseResponse 创建成功
    */
    async create() {
        // const {ctx} = this;
        // // aaa();   // aaa不存在，定义了错误处理应答，middleware/error_hander.js
        // ctx.body = 'user ctrl create'


        // 设置统一应答extend/helper.js
        // const {ctx} = this;
        // const res = {abc: 123};
        // ctx.helper.success({ctx, res});


        //请求参数校验，egg-validate
        // const {ctx} = this;
        // ctx.validate(ctx.rule.createUserRequest);
        // const res = {abc: 123};
        // ctx.helper.success({ctx, res});


        // 使用数据库，model
        const { ctx, service } = this;
        ctx.validate(ctx.rule.createUserRequest);
        const payload = ctx.request.body || {};
        const res = await service.user.create(payload);
        ctx.helper.success({ ctx, res });
    }


    /**
   * @summary 删除单个用户
   * @description 删除单个用户
   * @router delete /api/user/{id}
   * @request path string *id eg:1 用户ID
   * @response 200 baseResponse 创建成功
   */
    async destroy() {
        const { ctx, service } = this
        // 校验参数
        const { id } = ctx.params
        // 调用 Service 进行业务处理
        await service.user.destroy(id)
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx })
    }

    /**
     * @summary 修改用户
     * @description 获取用户信息
     * @router put /api/user/
     * @response 200 baseResponse 创建成功
     * @ignore
     */
    async update() {
        const { ctx, service } = this
        // 校验参数
        ctx.validate(ctx.rule.createUserRequest)
        // 组装参数
        const { id } = ctx.params
        const payload = ctx.request.body || {}
        // 调用 Service 进行业务处理
        await service.user.update(id, payload)
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx })
    }

    /**
     * @summary 获取单个用户
     * @description 获取用户信息
     * @router get /api/user/{id}
     * @request url baseRequest
     * @response 200 baseResponse 创建成功
     */
    async show() {
        const { ctx, service } = this
        // 组装参数
        const { id } = ctx.params
        // 调用 Service 进行业务处理
        const res = await service.user.show(id)
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx, res })
    }


    /**
     * @summary 获取所有用户(分页/模糊)
     * @description 获取用户信息
     * @router get /api/user
     * @request query integer *currentPage eg:1 当前页
     * @request query integer *pageSize eg:10 单页数量
     * @request query string search eg: 搜索字符串
     * @request query boolean isPaging eg:true 是否需要翻页
     * @response 200 baseResponse 创建成功
     */
    async list() {
        const { ctx, service } = this
        // 组装参数
        const payload = ctx.query
        // 调用 Service 进行业务处理
        const res = await service.user.list(payload)
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx, res })
    }

    /**
     * @summary 删除所选用户
     * @description 获取用户信息
     * @router delete /api/user/{id}
     * @request path string *id
     * @response 200 baseResponse 创建成功
     */
    async removes() {
        const { ctx, service } = this
        // 组装参数
        // const payload = ctx.queries.id
        const { id } = ctx.request.body
        const payload = id.split(',') || []
        // 调用 Service 进行业务处理
        const result = await service.user.removes(payload)
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx })
    }
}
module.exports = UserController;