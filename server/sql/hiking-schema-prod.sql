drop database if exists hiking;

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

