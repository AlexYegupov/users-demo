About
==============
Questions editor




Quick instructions (tested on ubuntu 14.04)
==============================================


Init database (tested on postgres 9.3.16)
------------------------------------------


0. Preparations:

  0.1 Create postgres user with same name as current OS user
  0.2 Set postgres user password to 'secret' value


1. Create database and metadata

(in psql):

```
create database stackover;
\c stackover

create table users(
    id serial primary key,
    name varchar(300)
);

alter table users add unique (name);
alter table users alter column name set not null;

insert into users(id, name) values ('john');
insert into users(id, name) values ('paul');
insert into users(id, name) values ('ringo');
insert into users(id, name) values ('george');


create table question(
    id serial primary key,
    text varchar(1000),
    userId integer references users
);


alter table question alter column text set not null;
alter table question alter column userId set not null;
alter table question add unique (text);


insert into question (1, text, userId) values (id, 'what they do in a bed?', 1);
<insert into question (2, text, userId) values (id, 'why dont we do it in a road?', 2);

create table answer(
    id serial primary key,
    questionId integer references question,
    text varchar(1000),
    userId integer references users
);

alter table answer alter column questionid set not null;
alter table answer alter column userId set not null;
alter table answer alter column text set not null;

insert into answer (id, questionId, text, userId) values (1, 1, 'q1 a1', 3);
insert into answer (id, questionId, text, userId) values (2, 1, 'q2 a2', 4);

# select * from question left join answer on question.id = answer.questionId ;
# id |             text              | userid | id | questionid | text  | userid
#----+-------------------------------+--------+----+------------+-------+--------
#  1 | what they do in a bed?        |      1 |  2 |          1 | q2 a2 |      4
#  1 | what they do in a bed?        |      1 |  1 |          1 | q1 a1 |      3
#  2 | why dont we do it in a road? |      2 |    |            |       |
# (3 rows)



```


2. Setup fresh nodejs (tested on v7.0.0)
----------------------------------------
(I used nvm for that)


3. Clone & Install sources
----------------------------------


```
 git clone https://github.com/AlexYegupov/users-demo
 cd users-demo
 git checkout origin/stackover

 npm i

 # Note: substitute your data (see also process.env.SO_DB_ in code and https://github.com/vitaly-t/pg-promise/wiki/Connection-Syntax#configuration-object)
 export SO_DB_NAME='stackover'
 export SO_DB_PWD='secret'

 npm run dev

 # Note: to use db env variables - seek "process.env.SO" in code

```






