-- Tabla para almacenar los datos de los usuarios y sus resultados del test vocacional
CREATE TABLE user_tests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    test_result JSONB NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índice para búsquedas por email
CREATE INDEX idx_user_tests_email ON user_tests(email);

-- Índice para búsquedas por fecha de creación
CREATE INDEX idx_user_tests_created_at ON user_tests(created_at);

-- Función para actualizar la columna updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at automáticamente
CREATE TRIGGER update_user_tests_updated_at
    BEFORE UPDATE ON user_tests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();