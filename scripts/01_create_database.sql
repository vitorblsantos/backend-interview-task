DO
  $$
  BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'caveo-database') THEN
      CREATE DATABASE "caveo-database";
    END IF;
  END;
$$;
