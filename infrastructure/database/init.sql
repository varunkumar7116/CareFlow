-- CareFlow Database Initialization Schema (PostgreSQL 16)

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(30) NOT NULL,
    phone_number VARCHAR(20),
    language VARCHAR(10) DEFAULT 'en',
    facility_id VARCHAR(36),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS households (
    id VARCHAR(36) PRIMARY KEY,
    village_name VARCHAR(100) NOT NULL,
    head_of_family VARCHAR(100),
    contact_number VARCHAR(20),
    chw_id VARCHAR(36) REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS patients (
    id VARCHAR(36) PRIMARY KEY,
    uhid VARCHAR(36) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    date_of_birth DATE NOT NULL,
    phone_number VARCHAR(20),
    preferred_language VARCHAR(10) DEFAULT 'en',
    household_id VARCHAR(36) REFERENCES households(id),
    chw_id VARCHAR(36) REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS facilities (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    facility_type VARCHAR(50) NOT NULL,
    district VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION
);

CREATE TABLE IF NOT EXISTS care_journeys (
    id VARCHAR(36) PRIMARY KEY,
    patient_id VARCHAR(36) REFERENCES patients(id) ON DELETE CASCADE,
    current_stage VARCHAR(30) NOT NULL,
    status VARCHAR(20) NOT NULL,
    assigned_chw_id VARCHAR(36) REFERENCES users(id),
    facility_id VARCHAR(36) REFERENCES facilities(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS care_journey_stages (
    id VARCHAR(36) PRIMARY KEY,
    journey_id VARCHAR(36) REFERENCES care_journeys(id) ON DELETE CASCADE,
    stage VARCHAR(30) NOT NULL,
    status VARCHAR(20) NOT NULL,
    action_taken VARCHAR(30),
    notes TEXT,
    actor_id VARCHAR(36),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS care_gaps (
    id VARCHAR(36) PRIMARY KEY,
    journey_id VARCHAR(36) REFERENCES care_journeys(id) ON DELETE CASCADE,
    patient_id VARCHAR(36) REFERENCES patients(id),
    gap_type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(20) NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tasks (
    id VARCHAR(36) PRIMARY KEY,
    care_gap_id VARCHAR(36) REFERENCES care_gaps(id) ON DELETE SET NULL,
    patient_id VARCHAR(36) REFERENCES patients(id),
    assigned_user_id VARCHAR(36) REFERENCES users(id),
    title VARCHAR(150) NOT NULL,
    description TEXT,
    priority VARCHAR(15) NOT NULL,
    status VARCHAR(20) NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS nav_nodes (
    id VARCHAR(36) PRIMARY KEY,
    facility_id VARCHAR(36) REFERENCES facilities(id) ON DELETE CASCADE,
    floor_number INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    node_type VARCHAR(30) NOT NULL,
    pos_x INT NOT NULL,
    pos_y INT NOT NULL
);

CREATE TABLE IF NOT EXISTS nav_edges (
    id VARCHAR(36) PRIMARY KEY,
    facility_id VARCHAR(36) REFERENCES facilities(id) ON DELETE CASCADE,
    source_node_id VARCHAR(36) REFERENCES nav_nodes(id) ON DELETE CASCADE,
    target_node_id VARCHAR(36) REFERENCES nav_nodes(id) ON DELETE CASCADE,
    distance_meters DOUBLE PRECISION NOT NULL,
    is_wheelchair_accessible BOOLEAN DEFAULT TRUE,
    has_stairs BOOLEAN DEFAULT FALSE,
    has_elevator BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS qr_anchors (
    id VARCHAR(36) PRIMARY KEY,
    facility_id VARCHAR(36) REFERENCES facilities(id) ON DELETE CASCADE,
    qr_code VARCHAR(100) UNIQUE NOT NULL,
    node_id VARCHAR(36) REFERENCES nav_nodes(id) ON DELETE CASCADE,
    description VARCHAR(150)
);

CREATE TABLE IF NOT EXISTS sync_outbox (
    id VARCHAR(36) PRIMARY KEY,
    device_id VARCHAR(50) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    entity_id VARCHAR(36) NOT NULL,
    operation_type VARCHAR(20) NOT NULL,
    payload TEXT NOT NULL,
    status VARCHAR(20) NOT NULL,
    retry_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
