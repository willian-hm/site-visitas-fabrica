CREATE TABLE IF NOT EXISTS visita
(
    idvisita serial NOT NULL,
    nome character varying COLLATE pg_catalog."default",
    email character varying COLLATE pg_catalog."default",
    motivo character varying COLLATE pg_catalog."default",
    dataentrada timestamp with time zone,
    foto character varying COLLATE pg_catalog."default",
    empresa character varying COLLATE pg_catalog."default",
    CONSTRAINT visita_pkey PRIMARY KEY (idvisita)
);
