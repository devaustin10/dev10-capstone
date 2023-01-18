drop database if exists hiking_test;

 

create database hiking_test;
use hiking_test;

 

create table hiker (
hiker_id int primary key auto_increment,
first_name varchar(250) not null,
last_name varchar(250) not null,
age int null,
email varchar(250) not null
); 

create table trail_difficulty (
trail_difficulty_id int primary key auto_increment,
`description` varchar (255) not null
);    

create table trail (
trail_id int primary key auto_increment,
trail_name varchar (250) not null,
trail_distance decimal not null,
city varchar (250) not null,
state varchar (250) not null,
trail_difficulty_id int not null,

 

constraint fk_trail_trail_difficulty_id
    foreign key (trail_difficulty_id)
    references trail_difficulty(trail_difficulty_id)
);

 

create table hike (
hike_id int primary key auto_increment,
hike_date date not null,
hike_difficulty varchar (255) null,
`description` varchar (255) null,
hiker_id int not null,
trail_id int not null,
constraint fk_hike_hiker_id
    foreign key (hiker_id)
    references hiker(hiker_id),
constraint fk_hike_trail_id
    foreign key (trail_id)
    references trail(trail_id)
    );

 


delimiter //
create procedure set_known_good_state()
begin

 

set sql_safe_updates = 0;

 

    delete from hike;
    alter table hike auto_increment = 1;
    delete from hiker;
    alter table hiker auto_increment = 1;
    delete from trail;
    alter table trail auto_increment = 1;
    delete from trail_difficulty;
    alter table trail_difficulty auto_increment = 1;

    insert into hiker
        (hiker_id, first_name, last_name, age, email) 
    values
        (1, 'John', 'Smith', 25, 'JohnSmith@gmail.com');

    insert into trail_difficulty
        (trail_difficulty_id, `description`)
    values
        (1, 'Easy');         

    insert into trail
        (trail_id, trail_name, trail_distance, city, state, trail_difficulty_id)
    values
        (1,'The Mountain', 1, 'Dallas', 'Texas', 1);    

    insert into hike 
        (hike_id, hike_date, hike_difficulty, hiker_id, trail_id)
    values
        (1, '2011-01-11', 'Easy', 1, 1);


       set sql_safe_updates = 1;

end //
-- 4. Change the statement terminator back to the original.
delimiter ;

 

call set_known_good_state();
call set_known_good_state();