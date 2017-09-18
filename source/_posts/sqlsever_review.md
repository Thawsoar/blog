---
title: SQL Sever 复习笔记
date: 2017-06-14 20:28:58
type: "index"
tags: [SQL Sever]
categories: SQL Sever
---

#### 创建数据库

```SQL
--if exists( select * from sysdatabases where name='db_name')
    --drop database School --删除当前指定名称的数据库
	create database db_name
		on primary
		(
			name='luoji_data',
			size=1mb,
			filegrowth='5%',
			maxsize=unlimited,
			filename='c:\data\userdb_data.mdf'
			)
		log on (
			name='luoji_log',
			size=1,
			filegrowth='5%',
			maxsize=unlimited,
			filename='c:\data\userdb_log.ldf'
			)
			
```

<!-- more -->

#### 创建数据表

```SQL
--if exists(select * from sysobjects where name='tb_name')
  --drop table Classes
	create table tb_name
		(
			teacher nvarchar(10) not null,
			classid int identity(1,1),
			classname nvarchar(50) not null,
			)
```

#### 主键约束

- 为id添加主键

```SQL
	alter table tb_name
	add constraint pk_id primary key(id)
```	

- 为name添加唯一键
```SQL
	alter table tb_name
	add constraint uq_name unique(name)
```	

- 同时创建salary的默认约束和age的check约束
```SQL
	alter table teacher
	add constraint df_salary default(5000) for salary,
	constraint ck_age check(age>0 and age<=100)
```	

- 为teacher表的classid字段创建主外键
```SQL
	alter table teacher
	with nocheck
	add constraint fk_classid foregin key(classid) references classes(classid)

```

#### SQL基本语句

##### 数据插入
```SQL
	use School
	insert into teacher values('张三',5,1,30,4000,'1984-9-11')
	insert into teacher(Name,ClassId,Gender,Age,Salary,Birthday) values('张三',5,1,30,4000,'1984-9-11')
```
##### 数据更新
```SQL
	update teacher set Gender='true' where id=20
	update teacher set classid=4,age+=5,salary=5000 where id=22 and age>20
```
##### 数据检索
```SQL
	select studentid,studentname,sex,[Address] from db_student--别名
	select studentid as 学号,StudentName 姓名,性别=Sex,[Address] from Student--添加常量列
    select StudentNo as 学号,StudentName 姓名,性别=Sex,[Address],国籍='中华人民共和国' from Student   
```
#### select的作用
```SQL
	select top 100 * from student
	select top 10 percent * from student
	select distinct distinct loginpwd,sex,email from student --distinct可以去除结果集中的重复记录
```
#### 聚合函数

- 1.对null过滤   
- 2.都需要有一个参数
- 3.都是返回一个数值
- sum()：求和:只能对数值而言,对字符串和日期无效
- avg()：求平均值
- count()：计数：得到满足条件的记录数
- min()：求最小值
- 获取学员总人数
```sql
   select count(*) from Student
```
- 查询最大年龄值
```SQL
    select MIN(BornDate) from student
```
- 指定区间范围
```SQL
    select studentid,,,, from Student where BornDate between '1990-1-1' and '1996-1-1'
```
- 查询班级id  1  3 5  7的学员信息
```SQL
	select * from Student where ClassId=1 or ClassId=3 or ClassId=5 or ClassId=7
```
- 指定具体的取值范围--可以是任意类型的范围.值的类型需要一致--可以相互转换
```SQL
	select * from Student where ClassId in(1,3,'5',7)
	select * from Student where ClassId not in(1,3,'5',7)
```

#### 模糊查询
- 查询姓林的女同学 等于号(=)是需要完全匹配
```SQL
	select * from Student where Sex='女' and StudentName='林'
	select * from Student where Sex='女' and StudentName  like '林%'--任意个字段
	select * from Student where Sex='女' and StudentName  like '林_'--任意单个字符
```
- [ ]的使用  学号在11~15之间的学员信息
```SQL
	select * from Student where StudentNo like '[13579]'
	---处理null值
	--null:不是地址没有分配,而是不知道你需要存储什么值  所以null是指   不知道。但是=只能匹配具体的值，而null根本就不是一个值
	select COUNT(email) from Student where Email !=null
	select COUNT(email) from Student where Email  is null
	select count(email) from Student where Email  is not null
    --将null值替换为指定的字符串值
	select StudentName,ISNULL(Email,'没有填写电子邮箱') from Student where ClassId=2
```

#### 分组统计
- 案例
```SQL
	select classid,Sex,COUNT(*) from Student 
	where Sex='男' group by ClassId,sex
```	

- 查询每一个班级的总人数,显示人数>=2的信息
```SQL
	select ClassId ,COUNT(*) as num from Student 
	where Email is not null
	GROUP by ClassId having COUNT(*)>=2 order by num desc
```
> select 字段列表 from 表列表  where 数据源做筛选 group by 分组字段列表 having 分组结果集做筛选 Order by  对结果集做记录重排

#### 子查询
- 查询比“lisa”年龄大的学员信息
```SQL
	select * from Student 
	where BornDate<(select BornDate from Student where StudentName='lisa')	
```
- 查询154班的学员信息
```SQL
	select * from Student 
	where ClassId=(select ClassId from grade where classname='154班')
```
- 当子查询返回多个值(多行一列),可以使用in来指定这个范围
```SQL
	select * from Student 
	where ClassId in(select ClassId from grade where classname<>'154班')
```
- 当没有用 EXISTS 引入子查询时，在选择列表中只能指定一个表达式。如果是多行多列或者一行多列就需要使用exists
- 使用 EXISTS 关键字引入子查询后，子查询的作用就相当于进行存在测试。外部查询的 WHERE 子句测试子查询返回的行是否存在
```SQL
    select * from Student where  EXISTS(select * from grade)
    select * from Student where  ClassId in(select * from grade)
```
- 查询年龄比“陶翔”大的学员，显示这些学员的信息
```SQL
	select * from Student 
	where BornDate<(select BornDate from Student where StudentName='陶翔')
```
- 查询154班开设的课程
```SQL
	select * from Subject 
	where ClassId=(select ClassId from grade where classname='154班')
```
- 查询参加最近一次“office”考试成绩最高分和最低分
1. 查询出科目 ID
```SQL
	select subjectid from Subject 
	where SubjectName='office'
```	
2. 查询出这一科目的考试日期
```SQL
	select MAX(ExamDate) from Result 
	where SubjectId=(select subjectid from Subject where SubjectName='office')
```
3. 写出查询的框架
```SQL
	select MAX(StudentResult),MIN(StudentResult) from Result 
	where SubjectId=() and ExamDate=()
```
4. 使用子查询做为条件
```SQL
	select MAX(StudentResult),MIN(StudentResult) from Result where SubjectId=(
    	select subjectid from Subject where SubjectName='office'
        	) and ExamDate=(
                	select MAX(ExamDate) from Result where SubjectId=(
                        	select subjectid from Subject where SubjectName='office'
                        	)
                    	)
```

#### 表连接Join
- inner join :能够找到两个表中建立连接字段值相等的记录
- 查询学员信息显示班级名称
```SQL
	select student.studentid,student.studentname,grade.className
	from student
	inner join grade on student.classid=grade.classid
```
- 左连接: 关键字前面的表是左表，后面的表是右表
- 左连接可以得到左表所有数据，如果建立关联的字段值在右表中不存在，那么右表的数据就以null值替换
```SQL
	select PhoneNum.*,PhoneType.*
	from PhoneNum  
	left join PhoneType on PhoneNum.pTypeId=PhoneType.ptId
```
-full join :可以得到左右连接的综合结果--去重复
```SQL	
	select PhoneNum.*,PhoneType.*
	from   PhoneNum  
	full join  PhoneType on PhoneNum.pTypeId=PhoneType.ptId
```

#### 视图
- 视图就是一张虚拟表，可以像使用子查询做为结果集一样使用视图
	select * from vw_getinfo
- 使用代码创建视图
- 语法：
	create view vw_自定义名称
	as
	--查询命令
	go
	--查询所有学员信息
	create view vw_getinfo
	as
- 可以通过聚合函数获取所以记录数
```SQL
	select top (select COUNT(*) from Student) Student.StudentNo,Student.StudentName,grade.ClassId,grade.classname from Student
    inner join grade on Student.ClassId=grade.ClassId  order by StudentName 
	视图中不能使用order by
    --select * from grade --只能创建一个查询语句
    --delete from grade where ClassId>100 --在视图中不能包含增加删除修改
	go
```