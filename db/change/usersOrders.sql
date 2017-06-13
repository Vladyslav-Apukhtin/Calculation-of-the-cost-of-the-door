CONNECT 'D:\test\work\diplom_2017\db\change\usersOrders.FDB'
USER 'SYSDBA' PASSWORD 'masterkey';

DROP DATABASE;

CREATE DATABASE 'D:\test\work\diplom_2017\db\change\usersOrders.FDB'
USER 'SYSDBA' PASSWORD 'masterkey';

/*==============================================================*/
/* Table: Orders                                                */
/*==============================================================*/
create table Orders
(
   width                INTEGER,
   height               INTEGER,
   amount               INTEGER,
   size                 VARCHAR(32),
   type                 VARCHAR(32),
   form                 VARCHAR(32),
   color                VARCHAR(32),
   dor1                 VARCHAR(32),
   dor2                 VARCHAR(32),
   dor3                 VARCHAR(32),
   dor4                 VARCHAR(32),
   dor5                 VARCHAR(32),
   dor6                 VARCHAR(32),
   id                   INTEGER not null,
   login                VARCHAR(32),
   primary key (id)
);

CREATE GENERATOR GENERATOR_Orders;
SET TERM ^ ;
CREATE TRIGGER trigger_Orders FOR Orders ACTIVE
BEFORE INSERT POSITION 1
AS 
BEGIN 
   if (new.id is null ) then
   new.id = gen_id (GENERATOR_Orders, 1);
END^
SET TERM ; ^

/*==============================================================*/
/* Table: Users                                                 */
/*==============================================================*/
create table Users
(
   surnameName          VARCHAR(64),
   login                VARCHAR(64) not null,
   password             VARCHAR(64),
   telNumber            VARCHAR(20),
   e_mail               VARCHAR(64),
   primary key (login)
);

alter table Orders add constraint FK_order foreign key (login)
      references Users (login);

