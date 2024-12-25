INSERT INTO users (id, email, name, status, role, createdAt, updatedAt)
VALUES
  (gen_random_uuid(), 'vitorblsantos@gmail.com', 'Vitor Barbosa de Lima', 'ENABLED', 'ADMIN', NOW(), NOW()),
  (gen_random_uuid(), 'foo@bar.com', 'Foo bar', 'ENABLED', 'USER', NOW(), NOW())
