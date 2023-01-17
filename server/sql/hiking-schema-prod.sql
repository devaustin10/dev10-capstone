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

 create table trail_difficulty (
trail_difficulty_id int primary key auto_increment,
`description` varchar (255) not null
);   

create table trail (
trail_id int primary key auto_increment,
trail_name varchar (250) not null,
trail_distance decimal not null, 
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
    



