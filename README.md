# AXTCloud - AWS Powered Hosting Platform

AXTCloud is a modern cloud hosting platform built with Next.js, featuring automatic AWS EC2 provisioning, Supabase authentication, and Razorpay payment integration.

## 🚀 Features

- **Automatic AWS Provisioning**: Launch EC2 instances instantly after payment.
- **Supabase Auth**: Secure user authentication and database management.
- **Razorpay Integration**: Localized INR payment processing with signature verification.
- **User Dashboard**: Start, stop, and terminate AWS instances from a central panel.
- **Responsive Design**: Mobile-first, high-performance UI with glassmorphic aesthetics.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database/Auth**: Supabase
- **Cloud**: AWS (EC2, EBS, VPC)
- **Payments**: Razorpay
- **Styling**: Vanilla CSS with Styled-JSX

## ⚙️ Environment Variables

To deploy this project, you need to configure the following environment variables in Vercel:

### Supabase
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key

### Razorpay
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`: Your Razorpay Key ID
- `RAZORPAY_KEY_ID`: Your Razorpay Key ID
- `RAZORPAY_KEY_SECRET`: Your Razorpay Key Secret

### AWS
- `AXT_AWS_REGION`: e.g., `ap-south-1` (Mumbai)
- `AXT_AWS_ACCESS_KEY_ID`: AWS IAM User Access Key
- `AXT_AWS_SECRET_ACCESS_KEY`: AWS IAM User Secret Key

### Admin Email (Optional)
- `RESEND_API_KEY`: For sending automated deployment emails.

## 📦 Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/avrxtcloud/AxtCloud.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## 📄 License
© 2024 AXT TECHNOLOGYS PVT LTD. All Rights Reserved.
