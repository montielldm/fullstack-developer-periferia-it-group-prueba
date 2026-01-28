INSERT INTO users (
    id,
    first_name,
    last_name,
    email,
    password,
    status,
    created_at,
    updated_at
) VALUES (
    gen_random_uuid(),
    'Admin',
    'User', 
    'admin@socialmedia.com',
    '$2b$10$UgQAg73qlmMITSqGp1Q45ezmb/Pfa.8hIbo5OpJ5cZLlO6OHsxR5y',
    'active',
    NOW(),
    NOW()
);