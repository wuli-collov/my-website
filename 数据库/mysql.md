https://www.runoob.com/mysql/mysql-create-database.html
创建数据库
create database 数据库名;
    create database test
        character set utf8mb4//设置字符集
        collate utf8mb4_general_ci;// 排序规则
    create databas if not exists test;//没有才会执行
删除数据库
drop database 数据库名;
drop database if exists test//存在才会执行

创建数据表
create table test(
    id INT AUTO_INCREMENT PRIMARY KEY,//id int类型 auto_increment自增 primary KEY主键
    username VARCHAR(50) NOT NULL,//username VARCHAR字符最多50 不为空
    email VARCHAR(100)  NOT NULL,//email VARCHAR字符最多100 不为空
    birthdate DATE,//birthdate 日期类型
    is_active BOOLEAN DEFAULT TRUE //is_active  布尔值 默认值true
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;//设置字符集和排序

SELECT UUID()查询uuid
主键 唯一的
外键 和表的关系

表关系
    一对一：比如：用户和用户信息，把任意一张表的主键同时设置为外键
    一对多：比如：用户和文章、班级和学生，在多一端的表上设置外键，对应到另一张表的主键
    多对多：比如：学生和老师，需要新建一张关系表，关系表至少包含另外两个外键
设计范式
    1.要求数据库表的每一列都是不可分割的原子数据项
    2.非主键列必须依赖与主键列
    3.非主键列必须直接依赖主键列

表记录的增删改
增CREATE
查Retrieve
改UPDATE
删DELETE
CRUD

    增加一条记录
    INSERT INTO `test`.`student`(
        `stuno`,
        `name`,
        `birthday`,
        `sex`,
        `phone`,
        `classid`
    )
    values(
        '001',"张三","1900-1-1",true,'15955106789',1
    );
    <!-- 修改语句 -->
    update student set name='李四' where id=1
    <!-- 删除 -->
    delete from student where id=1

 __查询语句__
slect ...
from  ...
where ...
order by ...
limt ...

select
    select * from user
    获取一个字段
    select id from user
    获取多个字段
    select id,loginid,loginpwd from user
    select id,loginid,loginpwd,"abc" from user//获取abc一列

    select ismale as `sex` from `employee` 定义别名或者ismale  `sex`
case
    select id,`name`,
    case ismale     //case 获取ismale列
    when 1 then '男'//，当数据为1时输出男
    else '女' //否则输出女
    end as sex
    from employee;

    第二种写法
     case     
    when ismale=1 then '男' 
    else '女'  

    case
    when salary>=10000 then '高'
    when salary>=5000 then '中'
    else '低'
    end `level`
    from employee;
where 条件
    =等于
        slect * from employee where ismale=1;
    in 
        slect * from department where companyId in (1,2);//查询公司id在1和2这个范围中
    is
        is null 空数据
        is not null 非空数据
    > < >= <=
        slect * from department where  salary>=10000
    between 在什么之间
        slect * from department where  salary between 10000 and 20000
    like 模糊查询
        _匹配一个字符
        %匹配多个字符
        select * from  department where name like '%袁%' 查询名字带袁的
    and 
        查询姓张的性别为女工资大于12000
        slect * from  department where name like '张%' and ismale=0 and salary>=12000
    or 或者出生日期大于1996-1-1
      slect * from  department where name like '张%' and (ismale=0 and salary>=12000)
        or
        birthday >='1996-1-1'

 order by 排序   
    asc 升序排序
    desc 降序排序
        slect * from  department where name like '张%' and (ismale=0 and salary>=12000)
            or
            birthday >='1996-1-1'
            order by sex asc

            order by sex desc,salary desc 性别相同按照工资降序排序


limt    跳过n条数据获取m条数据
    select * from employee
    limit 2,3 //跳过前面2条数据，获取三条数据

distinct 去重
    select distinct location from employee；去除地址不一样的

```sql
--登录
select * from user where  loginid='admin' and loginpwd="123456";
--查寻员工表,按照员工的入职时间降序排序，并且使用分页查询第二页的数据
--(page-1)*pageSize
select * from department order by employee.joinDate desc limit 10 ,10
--获取工资最高的女员工
select * from employee where ismale=0 order by salary desc limit 0,1
--去重
-- 所有员工地址不一样的 distinct放在前面，一般查询一条
select distinct location from employee
```

联表查询
笛卡尔积 当前表查询
    SELECT t1.name `主场`,t2.name `次场` from team as t1,team as t2
    WHERE t1.id != t2.id;

左连接 left join 以左表为基准 左表至少要出现一次
右连接 right join 以右表为基准 右表至少要出现一次
    左链接  到employee 条件是部门d.id=e.deptId
    SELECT *
    from department as d left JOIN employee as e on d.id=e.deptId;
    右链接
    SELECT *
    from employee as e right JOIN department as d on d.id=e.deptId;
内连接 inner join 条件必须满足
    SELECT *
    from department as d inner JOIN employee as e on d.id=e.deptId;


```sql
SELECT e.name as empname,d.name as dptname
from department as d left JOIN employee as e on d.id=e.deptId;
```

## 函数
    内置函数
     数学
        ABS(x) 返回x的绝对值
        CEIL(x) 向上取整
        FLOOR(x)向下取整
        MOD(x) 取模
        PI() 返回pi的值
        RAND() 返回0到1内的随机数
        ROUND(x,y) 返回参数x的四舍五入的y位小数的值 
        TRUNCATE(x,y)返回数字x截断为y位小数的结果

     聚合
        AVG(col) 返回指定列的平均值
        COUNT(col) 返回指定列中非NULL值的个数
        MIN(col) 返回指定列的最小值
        MAX(col) 返回指定列的最大值
        SUM(col) 返回指定列的所有值之和
        
            SELECT AVG(salary) FROM employee;
            SELECT MIN(salary) FROM employee;
            SELECT COUNT(id) FROM employee;查询员工的数量  COUNT(*)代表每行数据都去检查
            SELECT MAX(salary) FROM employee;
            SELECT SUM(salary) FROM employee;
     字符
        CONCAT(s1,s2,...sn)将s1,s2,...sn连接成字符串
        CONCAT_WS(sep,s1,s2,...sn)将s1,s2,...sn用sep连接成字符串
        TRIM(str)去除空余字符串
        LTRIM(str)去除开头空余字符串
        RTRIM(str)去除结束空余字符串
     日期
        CURDATE()或CURRENT_DATE()返回当前的日期
        CURTIME()或CURRENT_TIME()返回当前的时间
        TIMESTAMPDIFF(unit,datetime_expr1,datetime_expr2)返回datetime_expr1和datetime_expr2之间相隔的
        unit值，unit是用于指定的相隔的年或月或日等
        unit 
            microsecond 毫米
            second秒
            minute分
            hour小时
            day天
            week周
            month月
            quarter季度
            year年
        
        获取年龄
        SELECT TIMESTAMPDIFF(year,birthday,CURRENT_DATE()) as age FROM employee ORDER BY age asc;



    自定义函数

## 分组
分组后查询只能查询分组的列和聚合的列
SELECT location,COUNT(id) as '员工数量' FROM employee
GROUP BY location;


HAVING对GROUP BY后的条件进行分组
SELECT location,COUNT(id) as empnumber  FROM employee 
GROUP BY location,ismale
HAVING empnumber>=10 
;
my sql 执行顺序
from 
join on 
where
group by
select
having
order by
limit

## 视图
把查询语句保存起来
CREATE VIEW `company`.`info` AS SELECT location,COUNT(id) as empnumber  FROM employee 
GROUP BY location,ismale
HAVING empnumber>=10 ;

查询可以直接查询这个视图表
select * from info 


# 数据驱动和ORM
驱动程序是连接内存和其他介质的桥梁
mysql驱动程序是连接内存数据和mysql 数据的桥梁
mysql驱动程序通常使用 
        mysql
        mysql2
mysql2的使用
npm i mysql2
```js
const mysql = require('mysql2')
// 创建一个数据库连接
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "company",
});
```