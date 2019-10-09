--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: lesson_students; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE lesson_students (
    lesson_id integer,
    student_id integer,
    visit boolean DEFAULT false
);


--
-- Name: lesson_teachers; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE lesson_teachers (
    lesson_id integer,
    teacher_id integer
);


--
-- Name: lessons; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE lessons (
    id integer NOT NULL,
    date date NOT NULL,
    title character varying(100),
    status integer DEFAULT 0
);


--
-- Name: lessons_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE lessons_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: lessons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE lessons_id_seq OWNED BY lessons.id;


--
-- Name: students; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE students (
    id integer NOT NULL,
    name character varying(10)
);


--
-- Name: students_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE students_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE students_id_seq OWNED BY students.id;


--
-- Name: teachers; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE teachers (
    id integer NOT NULL,
    name character varying(10)
);


--
-- Name: teachers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE teachers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: teachers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE teachers_id_seq OWNED BY teachers.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY lessons ALTER COLUMN id SET DEFAULT nextval('lessons_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY students ALTER COLUMN id SET DEFAULT nextval('students_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY teachers ALTER COLUMN id SET DEFAULT nextval('teachers_id_seq'::regclass);


--
-- Data for Name: lesson_students; Type: TABLE DATA; Schema: public; Owner: -
--
INSERT INTO lesson_students VALUES (1,1,true);
INSERT INTO lesson_students VALUES (1,2,true);
INSERT INTO lesson_students VALUES (1,3,false);
INSERT INTO lesson_students VALUES (2,2,true);
INSERT INTO lesson_students VALUES (2,3,true);
INSERT INTO lesson_students VALUES (4,1,true);
INSERT INTO lesson_students VALUES (4,2,true);
INSERT INTO lesson_students VALUES (4,3,true);
INSERT INTO lesson_students VALUES (4,4,true);
INSERT INTO lesson_students VALUES (5,4,false);
INSERT INTO lesson_students VALUES (5,2,false);
INSERT INTO lesson_students VALUES (6,1,false);
INSERT INTO lesson_students VALUES (6,3,false);
INSERT INTO lesson_students VALUES (7,2,true);
INSERT INTO lesson_students VALUES (7,1,true);
INSERT INTO lesson_students VALUES (8,1,false);
INSERT INTO lesson_students VALUES (8,4,true);
INSERT INTO lesson_students VALUES (8,2,true);
INSERT INTO lesson_students VALUES (9,2,false);
INSERT INTO lesson_students VALUES (10,1,false);
INSERT INTO lesson_students VALUES (10,3,true);


--
-- Data for Name: lesson_teachers; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO lesson_teachers VALUES (1,1);
INSERT INTO lesson_teachers VALUES (1,3);
INSERT INTO lesson_teachers VALUES (2,1);
INSERT INTO lesson_teachers VALUES (2,4);
INSERT INTO lesson_teachers VALUES (3,3);
INSERT INTO lesson_teachers VALUES (4,4);
INSERT INTO lesson_teachers VALUES (6,3);
INSERT INTO lesson_teachers VALUES (7,1);
INSERT INTO lesson_teachers VALUES (8,4);
INSERT INTO lesson_teachers VALUES (8,3);
INSERT INTO lesson_teachers VALUES (8,2);
INSERT INTO lesson_teachers VALUES (9,3);
INSERT INTO lesson_teachers VALUES (10,3);

--
-- Data for Name: lessons; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO lessons VALUES (2, '2019-09-02', 'Red Color', 0);
INSERT INTO lessons VALUES (5,'2019-05-10', 'Purple Color',0);
INSERT INTO lessons VALUES (7,'2019-06-17', 'White Color',0);
INSERT INTO lessons VALUES (10,'2019-06-24', 'Brown Color',0);
INSERT INTO lessons VALUES (9,'2019-06-20', 'Yellow Color',1);
INSERT INTO lessons VALUES (1,'2019-09-03', 'Green Color',1);
INSERT INTO lessons VALUES (3,'2019-09-03', 'Orange Color',1);
INSERT INTO lessons VALUES (4,'2019-09-04', 'Blue Color',1);
INSERT INTO lessons VALUES (6,'2019-05-15', 'Red Color',1);
INSERT INTO lessons VALUES (8,'2019-06-17', 'Black Color',1);

--
-- Name: lessons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('lessons_id_seq', 10, true);


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO students VALUES (1,'Ivan');
INSERT INTO students VALUES (2,'Sergey');
INSERT INTO students VALUES (3,'Maxim');
INSERT INTO students VALUES (4,'Slava');

--
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('students_id_seq', 4, true);


--
-- Data for Name: teachers; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO teachers VALUES (1,'Sveta');
INSERT INTO teachers VALUES (2,'Marina');
INSERT INTO teachers VALUES (3,'Angelina');
INSERT INTO teachers VALUES (4,'Masha');

--
-- Name: teachers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('teachers_id_seq', 4, true);


--
-- Name: lessons_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY lessons
    ADD CONSTRAINT lessons_pkey PRIMARY KEY (id);


--
-- Name: students_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- Name: teachers_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY teachers
    ADD CONSTRAINT teachers_pkey PRIMARY KEY (id);


--
-- Name: lesson_students_lesson_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY lesson_students
    ADD CONSTRAINT lesson_students_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES lessons(id);


--
-- Name: lesson_students_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY lesson_students
    ADD CONSTRAINT lesson_students_student_id_fkey FOREIGN KEY (student_id) REFERENCES students(id);


--
-- Name: lesson_teachers_lesson_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY lesson_teachers
    ADD CONSTRAINT lesson_teachers_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES lessons(id);


--
-- Name: lesson_teachers_teacher_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY lesson_teachers
    ADD CONSTRAINT lesson_teachers_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES teachers(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--
