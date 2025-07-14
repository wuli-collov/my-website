# 安装
brew install mongodb-community@8.0
brew tap mongodb/brew


brew services start mongodb-community@8.0

brew services stop mongodb-community@8.0


通过`mongo`命令，即可进入`mongodb`的`shell`交互环境，在`shell`环境中，很多时候都可以使用简单的`js`语句即可完成对`mongodb`的控制



下面是`mongo`的常用命令：

1. 查看所有数据库：

   ```
   show dbs;
   ```

2. 显示当前使用的数据库：

   ```
   db;
   ```

3. 查看当前数据库状态：

   ```
   db.stats()
   ```

4. 查看数据库中所有的集合：

   ```shell
   show collections;
   ```

5. 切换数据库：

   ```shell
   use 数据库名;
   ```

6. 向集合中添加文档：

   ```js
   db.collection.insertOne({文档内容});
   db.collection.insertMany([多个文档]);
   ```

   > 新的文档如果没有指定字段`_id`，则会自动添加一个字段`_id`作为主键
   >
   > 自动的主键是一个`ObjectId`对象，该对象是通过调用函数`ObjectId()`创建的
   >
   > 它的原理是根据`时间戳+机器码+进程Id+自增量`生成的一个十六进制的唯一字符串
   >
   > 使用`ObjectId`函数还可以把某个字符串还原成一个`ObjectId`对象，例如`ObjectId("xxxxx")`

7. 查询文档：

   ```js
   db.collection.find(查询对象);
   ```

8. 修改文档：

   ```shell
   db.collection.updateOne(<filter>, <update>)
   db.collection.updateMany(<filter>, <update>)
   db.collection.replaceOne(<filter>, <update>)
   ```

9. 删除文档：

   ```shell
   db.collection.deleteMany(查询对象)
   db.collection.deleteOne(查询对象)
   ```

# 驱动
pnpm i mongoose
mongodb的驱动就叫做`mongodb`



> 创建连接、模型定义，CRUD



mongoose官网：https://mongoosejs.com/

mongoose民间中文网：http://www.mongoosejs.net/



schema: 结构，描述某种数据中有哪些字段、每个字段是什么类型、每个字段的约束

模型：对应数据库中集合的文档



模型：



1. 用户：

   ```js
   {
     loginId:"账号",
     loginPwd:"密码",
     name:"姓名",
     loves: ["爱好"],
     address: {
       province: "省份",
       city: "城市"
     }
   }
   ```

   



2. 用户操作：

   ```js
   {
     operation: "登录",
     time: 日期,
     userid: 用户的id,
     extraInfo: 任意对象, // 操作额外的信息
     address: { // 操作的地址
       province: "省份",
       city: "城市"
     }
   }
   ```

   



# 新增文档
## mongodb原生操作

```js
// 新增单个数据，doc是一个文档对象
db.<collection>.insertOne(doc); 

// 新增多个数据，docs是一个文档数组
db.<collection>.insertMany(docs); 

// 新增单个或多个数据，返回新增的行数，doc即可以是一个文档对象，也可以是一个文档数组
db.<collection>.insert(doc); 
```

> mognoose中的所有验证规则在原生操作中无效

## mongoose操作

**方式1：创建模型对象，然后保存**

```js
var obj = new <Model>(doc); 
var result = await obj.save(); // 保存文档到数据库，会触发验证，也可以使用回调模式
```

**方式2：直接使用函数创建对象**

```js
// 创建一个或多个文档
// 也可以使用回调模式
// 若传入单个对象，返回单个对象
// 若传入多个对象，返回一个数组
var result = await <Model>.create(...doc); 
```



**创建操作的细节**：

- `mongoose`会为每个对象（包括子对象）添加唯一键`_id`，这是一种极好的的做法，特别是在对象数组中，可以有效的维护数据的唯一标识

  - 如果希望禁用这种做法，只需要在相应的`Schema`中配置`_id: false`

- `mongoose`在创建文档时，会自动生成一个字段`__v`，该字段用于方式并发冲突（后续课程中讲解）

  - 如果希望禁用这种做法，只需要在`Schema`的第二个参数中配置`versionKey: false`

- `mongoose`总是会在保存文档时触发验证，如果希望禁用这种行为，可以有两种做法：

  - 在`Schema`的第二个参数中配置`validateBeforeSave:false`，这将导致使用该`Schema`的`Model`在保存时均不会触发验证

  - 在调用`save`方法或`create`方法时，传入一个配置对象，配置`validateBeforeSave:false`，这样一来，仅针对这一次调用不进行验证。当给`create`方法传入配置时，为了避免歧义，需要将第一个参数设置为数组。

    > `mongoose`支持`<Model>.validate(doc, [context])`直接对文档进行验证，该验证是异步的。
    >
    > 当验证失败时，抛出的错误类型是`ValidationError`
    >
    > 注意：unique在数据库中表现为唯一索引（unique index），并不属于验证的范畴，因此尽管`unique`约束不满足，也不会导致验证失败，最终在添加时会抛出`MongoError`，而不是`ValidationError`

- `<Model>.create(doc, option)`等效于`new <Model>(doc).save(option)`

  - 如果你给`create`传入的是多个文档，则其在内部会创建多个模型，然后循环调用它们的`save`方法

- 无论用哪一种方式，都会得到**模型实例**，该实例会被`mongoose`持续跟踪，只要对模型实例的修改都会被记录，一旦重新调用模型实例的`save`方法，就会把之前对模型的所有更改持久化到数据库。

- 新增对象时，如果遇到`Schema`中没有定义的字段，则会被忽略


