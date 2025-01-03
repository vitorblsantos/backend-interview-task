CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "cognitoId" UUID,
  email VARCHAR(50) NOT NULL,
  "isOnboarded" BOOLEAN DEFAULT FALSE,
  name VARCHAR(80),
  role VARCHAR(20) NOT NULL,
  status VARCHAR(40) NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "deletedAt" TIMESTAMP WITH TIME ZONE,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
