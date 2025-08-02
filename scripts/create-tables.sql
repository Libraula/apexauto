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
  service_location TEXT NOT NULL, -- 'shop', 'mobile', 'home'
  selected_add_ons TEXT[], -- Array of add-on IDs
  
  -- Vehicle Information
  vehicle_type TEXT NOT NULL,
  vehicle_year TEXT NOT NULL,
  vehicle_make TEXT NOT NULL,
  vehicle_model TEXT NOT NULL,
  
  -- Location & Scheduling
  service_address TEXT,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  
  -- Additional Information
  special_requests TEXT,
  
  -- Pricing
  total_price DECIMAL(10,2) NOT NULL,
  
  -- Booking Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  
  -- Internal Notes
  admin_notes TEXT
);

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Image Information
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('Exterior', 'Interior', 'Paint Protection', 'Full Service')),
  
  -- Image URLs
  before_image_url TEXT NOT NULL,
  after_image_url TEXT NOT NULL,
  
  -- Display Options
  is_featured BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Contact Information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service_interest TEXT,
  message TEXT NOT NULL,
  
  -- Status
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'closed')),
  
  -- Response tracking
  responded_at TIMESTAMP WITH TIME ZONE,
  response_notes TEXT
);

-- Create subscription_plans table
CREATE TABLE IF NOT EXISTS subscription_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Plan Details
  name TEXT NOT NULL,
  description TEXT,
  monthly_price DECIMAL(10,2) NOT NULL,
  yearly_price DECIMAL(10,2) NOT NULL,
  savings DECIMAL(10,2) NOT NULL,
  
  -- Plan Features
  features TEXT[], -- Array of features
  visits_per_month TEXT NOT NULL,
  duration_per_visit TEXT NOT NULL,
  warranty TEXT NOT NULL,
  support_level TEXT NOT NULL,
  
  -- Status
  is_popular BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0
);

-- Create customer_subscriptions table
CREATE TABLE IF NOT EXISTS customer_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Customer Information
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  
  -- Subscription Details
  plan_id UUID REFERENCES subscription_plans(id),
  billing_type TEXT NOT NULL CHECK (billing_type IN ('monthly', 'yearly')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'cancelled', 'expired')),
  
  -- Billing Information
  start_date DATE NOT NULL,
  next_billing_date DATE NOT NULL,
  
  -- Service Preferences
  service_address TEXT,
  special_instructions TEXT
);

-- Create home_content table for managing homepage content
CREATE TABLE IF NOT EXISTS home_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Content type
  content_type TEXT NOT NULL CHECK (content_type IN ('hero_image', 'service_image', 'testimonial_image', 'about_image')),
  
  -- Content details
  title TEXT,
  description TEXT,
  image_url TEXT,
  alt_text TEXT,
  
  -- Display options
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(preferred_date);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_images(category);
CREATE INDEX IF NOT EXISTS idx_gallery_featured ON gallery_images(is_featured);
CREATE INDEX IF NOT EXISTS idx_gallery_active ON gallery_images(is_active);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_subscription_status ON customer_subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscription_email ON customer_subscriptions(customer_email);
CREATE INDEX IF NOT EXISTS idx_home_content_type ON home_content(content_type);
CREATE INDEX IF NOT EXISTS idx_home_content_active ON home_content(is_active);

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
CREATE TRIGGER update_subscription_plans_updated_at BEFORE UPDATE ON subscription_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customer_subscriptions_updated_at BEFORE UPDATE ON customer_subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_home_content_updated_at BEFORE UPDATE ON home_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default subscription plans
INSERT INTO subscription_plans (name, description, monthly_price, yearly_price, savings, features, visits_per_month, duration_per_visit, warranty, support_level, is_popular, display_order) VALUES
('Essential Care', 'Perfect for regular maintenance and basic protection', 89, 890, 178, ARRAY['Monthly exterior wash & wax', 'Interior vacuum & wipe down', 'Tire shine & wheel cleaning', 'Window cleaning (interior & exterior)', 'Priority booking', '10% discount on additional services'], '1 per month', '2-3 hours per visit', 'Service guarantee', 'Standard support', false, 1),
('Premium Protection', 'Comprehensive care with advanced protection features', 149, 1490, 298, ARRAY['Bi-weekly premium detailing', 'Quarterly paint protection treatment', 'Deep interior cleaning monthly', 'Leather conditioning & protection', 'Engine bay cleaning (quarterly)', 'Priority emergency service', '15% discount on additional services', 'Free minor scratch repair'], '2 per month', '3-4 hours per visit', 'Extended service warranty', 'Priority support', true, 2),
('Luxury Elite', 'Ultimate care package for luxury and exotic vehicles', 249, 2490, 498, ARRAY['Weekly premium detailing service', 'Monthly ceramic coating maintenance', 'Paint correction (as needed)', 'Premium leather restoration', 'Concierge pickup & delivery', '24/7 emergency detailing', '20% discount on additional services', 'Complimentary annual paint protection film', 'White glove interior treatment'], '4 per month', '4-6 hours per visit', 'Comprehensive warranty', 'VIP concierge support', false, 3);

-- Insert default home content
INSERT INTO home_content (content_type, title, description, image_url, alt_text, is_active, display_order) VALUES
('hero_image', 'Premium Car Detailing', 'Transform your vehicle with our premium detailing services', '/placeholder.svg?height=600&width=800', 'Premium car detailing service', true, 1),
('service_image', 'Professional Team', 'Our expert team delivering exceptional results', '/placeholder.svg?height=500&width=600', 'Professional detailing team', true, 1),
('about_image', 'Quality Results', 'See the difference our attention to detail makes', '/placeholder.svg?height=400&width=600', 'Quality detailing results', true, 1);
