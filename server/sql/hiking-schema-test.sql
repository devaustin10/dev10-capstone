drop database if exists hiking_test;

create database hiking;
use hiking;

create table hiker (
hiker_id int primary key auto_increment,
first_name varchar(250) not null,
last_name varchar(250) not null,
age int null,
email varchar(250) not null
); 
    
create table trail (
trail_id int primary key auto_increment,
trail_name varchar (250) not null,
trail_distance int not null, -- might need to change to decimal later
trail_difficulty varchar (250) null
);

create table hike (
hike_id int primary key auto_increment,
hike_date date not null,
`description` varchar (255) not null,
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

    delete from trail;
    alter table trail auto_increment = 1;
	delete from hike;
	alter table hike auto_increment = 1;
    delete from hiker;
    alter table hiker auto_increment = 1;

    
    insert into hiker(hiker_id, first_name, last_name, age, email) values
        (1, 'John', 'Smith', 25, 'JohnSmith@gmail.com');
        
	insert into hike (hike_id, hike_date, hike_difficulty, hiker_id, trail_id)
		values
	(1, '01/11/2011', 1, 1);
        
	insert into trail
		(trail_id, trail_name, trail_distance, trail_difficulty)
	values
		(1,'The Mountain', 1 , 'Easy');
        
end //
-- 4. Change the statement terminator back to the original.
delimiter ;

