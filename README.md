# Medical Claim 

A comprehensive React-based dashboard for reviewing, auditing, and managing medical insurance claims with PDF generation capabilities.

##  Overview

The Medical Claim is a full-featured application designed for healthcare insurance professionals to review, analyze, and process medical claims. It provides a split-screen interface with a live PDF preview on the left and an interactive data panel on the right.

![Medical Claim Review Dashboard](https://via.placeholder.com/800x400?text=Medical+Claim+Review+Dashboard)

##  Features

### Core Functionality
- **Split-Screen Interface**: Live PDF preview alongside interactive data forms
- **Patient Information Management**: View and edit patient demographics
- **Claim Summary Dashboard**: Real-time claim status, amounts, and discrepancies
- **Bills Analysis**: Detailed breakdown of medical bills with NME (Non-Medical Expense) tracking
- **Audit Analysis**: Medical legibility issues, policy violations, and ICD-10 codes
- **Document Navigation**: Interactive document segments with page navigation
- **PDF Generation**: Download comprehensive audit reports as PDF

### Data Management
- **Patient Registration Form**: Complete registration with validation
- **Bank Details Management**: Account information with cheque preview
- **Government ID Display**: Visual representation of identification documents
- **Cash Receipt Tracking**: Itemized payment receipts
- **Local Storage**: Form data persistence in browser

### Visualization
- **Live PDF Preview**: Real-time document rendering
- **Interactive Tables**: Expandable bill sections with item details
- **Status Indicators**: Color-coded badges for NME items, policy violations
- **Document Segments**: Visual page range navigation

##  Technologies Used

- **React 19** - UI library
- **Tailwind CSS 4** - Styling
- **@react-pdf/renderer** - PDF generation
- **LocalStorage API** - Data persistence
- **Vite** - Build tool and development server

##  Project Structure

```
medical-claim-review-dashboard/
├── public/                  # Static assets
├── src/
│   ├── components/          # React components
│   │   ├── audit/           # Audit analysis components
│   │   ├── bank/            # Bank details components
│   │   ├── bills/           # Bills section components
│   │   ├── claim/           # Claim summary components
│   │   ├── common/          # Reusable UI components
│   │   ├── documents/       # Document segments
│   │   ├── identity/        # Government ID components
│   │   ├── layout/          # Layout components
│   │   ├── patient/         # Patient information
│   │   ├── pdf/             # PDF generation
│   │   ├── receipt/         # Cash receipt components
│   │   └── registration/    # Patient registration forms
│   ├── data/                # JSON data files
│   ├── utils/               # Utility functions
│   ├── App.jsx              # Main application
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
└── README.md                # Documentation
```

##  Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/medical-claim-review-dashboard.git
   cd medical-claim-review-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   # or
   yarn preview
   ```

##  Usage Guide

### Dashboard Navigation

1. **Left Panel - PDF Viewer**
   - Displays live preview of the claim audit report
   - Updates in real-time as data changes
   - Page navigation through document segments

2. **Right Panel - Data Forms**
   - Scroll through various sections:
     - Patient Information
     - Claim Summary
     - Bank Account Details
     - Cheque Details
     - Government ID Card
     - Cash Receipt
     - Patient Registration Form
     - Bills Section
     - Audit Issues
     - Document Segments

### Key Features Walkthrough

#### Patient Registration Form
- Complete multi-section form with validation
- Fields include personal info, emergency contact, insurance, medical history
- Data is stored in localStorage upon submission
- View stored forms in the sidebar

#### PDF Generation
- Click "Download PDF" button in header
- Generates comprehensive audit report with all sections
- Multiple pages including patient info, bills, audit analysis

#### Document Navigation
- Document Segments section shows all document types
- Click on page numbers to jump to specific pages in PDF
- Visual indicators for page ranges

#### Audit Analysis
- Three tabs: Medical Legibility, Policy Violations, ICD Codes
- Color-coded issues with recommendations
- Impact amounts for policy violations

## 📊 Data Structure

### Sample JSON Structure

```json
{
  "session_id": "cad6cb7c-2ec5-436b-b04f-91780e18f08f",
  "claim_id": "123123",
  "status": "NO_CAMOUNT",
  "claim_type": "OPD",
  "edited_data": {
    "patient_summary": {
      "patient_details": {
        "patient_name": "John Michael Smith",
        "patient_dob": "1985-03-15",
        "patient_policy_no": "POL-987654321"
      },
      "hospitalization_details": {
        "doa": "2025-01-20",
        "dod": "2025-01-25",
        "claimed_amount": 450.0
      }
    },
    "nme_analysis": {
      "bills": [
        {
          "bill": {
            "bill_id": "dba53ff23412",
            "invoice_number": "BILL-2025-789456",
            "net_amount": 6418.65
          },
          "items": []
        }
      ]
    }
  },
  "audit_analysis": {
    "original_claimed_amount": 450.0,
    "true_total_of_bills": 6910.0,
    "discrepancy_amount": 6460.0,
    "status": "UNDERCLAIMED"
  }
}
```

##  Component Documentation

### Common Components

| Component | Description | Props |
|-----------|-------------|-------|
| `Section` | Wrapper with title and styling | `title`, `children`, `className` |
| `InfoField` | Key-value display with formatting | `label`, `value`, `format`, `highlight` |
| `DownloadButton` | PDF generation trigger | `data` |

### Feature Components

| Component | Description | Location |
|-----------|-------------|----------|
| `PatientRegistrationForm` | Complete registration form | `registration/` |
| `BankDetails` | Bank account information | `bank/` |
| `GovernmentIdCard` | ID card visualization | `identity/` |
| `BillsSection` | Expandable bill items | `bills/` |
| `AuditIssues` | Tabbed audit analysis | `audit/` |
| `DocumentSegments` | Page navigation | `documents/` |

##  Styling

The application uses Tailwind CSS for styling with a custom configuration:

- **Primary Color**: Blue (`#2563eb`, `#1e3a8a`)
- **Success**: Green (`#22c55e`, `#166534`)
- **Warning**: Yellow (`#eab308`, `#854d0e`)
- **Error**: Red (`#ef4444`, `#991b1b`)
- **Background**: Gray (`#f3f4f6`, `#e5e7eb`)

##  Configuration Files

### vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

##  Responsive Design

The dashboard is designed for desktop screens (minimum 1280px width). Key responsive features:

- Fixed header with claim ID
- Split-screen layout (50/50)
- Scrollable right panel
- Grid layouts adapt to content

##  Error Handling

- Form validation with real-time feedback
- Fallback values for missing data
- Console logging for debugging
- User-friendly error messages

##  Data Persistence

Patient registration forms are stored in browser's localStorage:
- **Key**: `patientForms`
- **Format**: JSON array of form objects
- **Includes**: Timestamps, all form fields

##  PDF Generation

The PDF report includes:
1. Patient Information
2. Hospitalization Details
3. Claim Summary
4. Bank Account Details
5. Cheque Details
6. Government ID Card
7. Cash Receipt
8. Patient Registration Data
9. Bill Details (multiple pages)
10. Audit Analysis
11. Document Segments

##  Future Enhancements

- [ ] User authentication and roles
- [ ] API integration for real data
- [ ] Advanced search and filtering
- [ ] Export to Excel/CSV
- [ ] Email report functionality
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Mobile responsive design
- [ ] Print optimization
- [ ] Data visualization charts

##  Troubleshooting

### Common Issues

**PDF not generating**
- Check if data prop is passed correctly
- Verify @react-pdf/renderer is installed
- Check browser console for errors

**Form data not saving**
- Ensure localStorage is enabled
- Check for storage quota exceeded
- Verify form validation passes

**Styling issues**
- Clear browser cache
- Verify Tailwind classes are generated
- Check for CSS conflicts

##  Dependencies

```json
{
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "@react-pdf/renderer": "^4.3.2",
    "react-router-dom": "^7.13.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.1.1",
    "autoprefixer": "^10.4.20",
    "tailwindcss": "^4.1.18",
    "vite": "^7.3.1"
  }
}
```

