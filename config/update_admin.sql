-- Update admin user's password to 'admin123' with proper bcrypt hash
UPDATE users 
SET password = '$2b$10$3UEqG55a/ez5On.mi3wnQ.DrIRpmtM6LMQzsbXT0e3tkP.2hR0N4K'
WHERE username = 'admin'; 