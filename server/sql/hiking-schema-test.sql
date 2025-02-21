drop database if exists hiking_test;

create database hiking_test;
use hiking_test;

 

create table hiker (
hiker_id varchar(250) primary key,
first_name varchar(250) not null,
last_name varchar(250) not null,
age int not null
); 

 create table trail_difficulty (
trail_difficulty_id int primary key auto_increment,
`description` varchar (255) not null
);   

create table trail (
trail_id int primary key auto_increment,
trail_name varchar (250) not null,
trail_distance decimal (10,1) not null, 
trail_difficulty_id int not null,
city varchar (250) not null,
state varchar (250) not null,

constraint fk_trail_trail_difficulty_id
	foreign key (trail_difficulty_id)
	references trail_difficulty(trail_difficulty_id)
);

create table hike (
hike_id int primary key auto_increment,
hike_date date not null,
hike_difficulty varchar (255) not null,
`description` varchar (255) not null,
hiker_id varchar (250) not null,
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
        (first_name, last_name, age, hiker_id) 
    values
        ('John','Smith',27,'therealjohnsmith'),
		('Alice','Liddell',18,'wonderlander1865'),
		('Holden','Caulfield',25,'neverinfilm'),
		('Violet','Baudelaire',23,'veryunf0rtunatevi'),
		('Atticus','Finch',40,'atticusfinchlaw'),
		('Philip','Marlowe',35,'bigsleeper893');

    insert into trail_difficulty
        (trail_difficulty_id, `description`)
    values
        (1, 'Easy');         

    insert into trail
        (trail_id, trail_name, trail_distance, city, state, trail_difficulty_id)
    values
        (1,'The Mountain', 1, 'Dallas', 'Texas', 1);    

    insert into hike 
        (hike_id, hike_date, hike_difficulty, `description`, hiker_id, trail_id)
    values
        (1, '2011-01-11', 'Easy', 'Easy Trail', 'therealjohnsmith', 1);


       set sql_safe_updates = 1;

end //
-- 4. Change the statement terminator back to the original.
delimiter ;

call set_known_good_state();
call set_known_good_state();