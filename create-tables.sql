-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Customer Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Service Details
  service_type TEXT NOT NULL,
  package_name TEXT NOT NULL,
  estimated_price DECIMAL(10,2),
  
  -- Vehicle Information
  vehicle_make TEXT NOT NULL,
  vehicle_model TEXT NOT NULL,
  vehicle_year INTEGER,
  vehicle_color TEXT,
  license_plate TEXT,
  
  -- Location & Scheduling
  service_address TEXT NOT NULL,
  suburb TEXT NOT NULL,
  postcode TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  alternative_date DATE,
  alternative_time TEXT,
  
  -- Additional Information
  special_requirements TEXT,
  vehicle_condition TEXT,
  access_instructions TEXT,
  
  -- Booking Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  
  -- Payment Information
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  payment_method TEXT,
  
  -- Internal Notes
  admin_notes TEXT,
  estimated_duration INTEGER, -- in minutes
  
  -- Pricing breakdown
  base_price DECIMAL(10,2),
  additional_charges DECIMAL(10,2) DEFAULT 0,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  total_price DECIMAL(10,2)
);

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Image Information
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  
  -- Categorization
  category TEXT NOT NULL CHECK (category IN ('before_after', 'exterior', 'interior', 'engine_bay', 'wheels', 'paint_correction', 'ceramic_coating', 'other')),
  service_type TEXT, -- Links to the service this showcases
  
  -- Image Metadata
  file_size INTEGER,
  file_type TEXT,
  width INTEGER,
  height INTEGER,
  
  -- Display Options
  is_featured BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  
  -- SEO
  alt_text TEXT,
  tags TEXT[], -- Array of tags for filtering
  
  -- Before/After specific fields
  is_before_after BOOLEAN DEFAULT FALSE,
  before_image_url TEXT,
  after_image_url TEXT
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Contact Information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- Message Details
  subject TEXT,
  message TEXT NOT NULL,
  inquiry_type TEXT CHECK (inquiry_type IN ('general', 'booking', 'franchise', 'complaint', 'compliment', 'other')),
  
  -- Status
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'closed')),
  
  -- Response tracking
  responded_at TIMESTAMP WITH TIME ZONE,
  response_notes TEXT
);

-- Create franchise_applications table
CREATE TABLE IF NOT EXISTS franchise_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Personal Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date_of_birth DATE,
  
  -- Address Information
  street_address TEXT NOT NULL,
  suburb TEXT NOT NULL,
  state TEXT NOT NULL,
  postcode TEXT NOT NULL,
  
  -- Business Experience
  has_business_experience BOOLEAN DEFAULT FALSE,
  business_experience_details TEXT,
  has_automotive_experience BOOLEAN DEFAULT FALSE,
  automotive_experience_details TEXT,
  
  -- Financial Information
  available_capital DECIMAL(12,2),
  financing_required BOOLEAN DEFAULT FALSE,
  financing_amount DECIMAL(12,2),
  
  -- Preferences
  preferred_territory TEXT,
  preferred_start_date DATE,
  full_time_commitment BOOLEAN DEFAULT TRUE,
  
  -- Additional Information
  motivation TEXT,
  additional_comments TEXT,
  
  -- Application Status
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'interview_scheduled', 'approved', 'rejected', 'withdrawn')),
  
  -- Internal tracking
  reviewed_by TEXT,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  interview_date TIMESTAMP WITH TIME ZONE,
  decision_date TIMESTAMP WITH TIME ZONE,
  decision_notes TEXT
);

-- Create subscription_plans table
CREATE TABLE IF NOT EXISTS subscription_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Plan Details
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  billing_frequency TEXT NOT NULL CHECK (billing_frequency IN ('monthly', 'quarterly', 'yearly')),
  
  -- Service Inclusions
  services_included TEXT[], -- Array of included services
  service_frequency TEXT, -- e.g., "monthly", "bi-weekly"
  max_services_per_period INTEGER,
  
  -- Plan Features
  priority_booking BOOLEAN DEFAULT FALSE,
  discount_percentage DECIMAL(5,2) DEFAULT 0,
  additional_benefits TEXT[],
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0
);

-- Create customer_subscriptions table
CREATE TABLE IF NOT EXISTS customer_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Customer Information
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  
  -- Subscription Details
  plan_id UUID REFERENCES subscription_plans(id),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'cancelled', 'expired')),
  
  -- Billing Information
  start_date DATE NOT NULL,
  next_billing_date DATE NOT NULL,
  last_billing_date DATE,
  
  -- Usage Tracking
  services_used_this_period INTEGER DEFAULT 0,
  services_remaining INTEGER,
  
  -- Payment Information
  payment_method TEXT,
  payment_status TEXT DEFAULT 'current' CHECK (payment_status IN ('current', 'overdue', 'failed')),
  
  -- Subscription Management
  auto_renew BOOLEAN DEFAULT TRUE,
  cancellation_date DATE,
  cancellation_reason TEXT,
  
  -- Service Preferences
  preferred_service_day TEXT,
  preferred_service_time TEXT,
  service_address TEXT,
  special_instructions TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(preferred_date);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_images(category);
CREATE INDEX IF NOT EXISTS idx_gallery_featured ON gallery_images(is_featured);
CREATE INDEX IF NOT EXISTS idx_gallery_active ON gallery_images(is_active);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_franchise_status ON franchise_applications(status);
CREATE INDEX IF NOT EXISTS idx_subscription_status ON customer_subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscription_email ON customer_subscriptions(customer_email);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_gallery_updated_at BEFORE UPDATE ON gallery_images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_franchise_updated_at BEFORE UPDATE ON franchise_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscription_plans_updated_at BEFORE UPDATE ON subscription_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customer_subscriptions_updated_at BEFORE UPDATE ON customer_subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default subscription plans
INSERT INTO subscription_plans (name, description, price, billing_frequency, services_included, service_frequency, max_services_per_period, priority_booking, discount_percentage, additional_benefits) VALUES
('Maintain Me', 'Perfect for keeping your car looking fresh with regular maintenance cleaning', 99.00, 'monthly', ARRAY['Essential Detail'], 'monthly', 1, false, 15.00, ARRAY['Priority booking', 'Flexible scheduling']),
('Stay Fresh', 'Comprehensive monthly care with interior and exterior attention', 159.00, 'monthly', ARRAY['Signature Detail'], 'monthly', 1, true, 20.00, ARRAY['Priority booking', 'Free odour treatment', 'Seasonal protection']),
('Executive', 'Premium monthly service for the discerning car owner', 199.00, 'monthly', ARRAY['Elite Detail'], 'monthly', 1, true, 25.00, ARRAY['Priority booking', 'Paint protection top-up', 'Concierge service', 'Emergency cleaning']);
