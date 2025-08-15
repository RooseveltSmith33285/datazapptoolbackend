const express=require('express')
const app=express();
const cors=require('cors');
const dataModel=require('./data')
const userModel = require('./user');
const nodemailer=require('nodemailer')


app.use(cors())
app.use(express.json())
const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://user:user@cluster0.pfn059x.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0', {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4
});

  function processArrayField(field) {
    // Handle string that looks like an array
    if (typeof field === 'string') {
      try {
        field = JSON.parse(field);
      } catch (e) {
        return [field];
      }
    }
    
    if (!Array.isArray(field)) {
      return field ? [field] : [];
    }
    
    // Flatten the array first
    const flattened = field.flat(Infinity);
    
    // Extract values from objects or keep strings as is
    return flattened.map(item => {
      if (typeof item === 'object' && item !== null && item.value) {
        return item.value; // Extract the value property
      }
      return item; // Keep strings as is
    }).filter(item => item && item.trim && item.trim() !== ''); // Filter out empty strings
  }
  
  // Process all array fields
  function processDataArrays(data) {
    const arrayFields = [
      'zip_codes', 'states', 'cities', 'dwelling_type', 'home_owner',
      'hh_income', 'indivisuals', 'martial_status', 'age_group', 'credit_rating',
      'ethnic_code', 'propensity_to_give', 'donor_affinity_range', 'turning_65',
      'pet_range', 'propensity_range', 'outdoor_range', 'sports_and_fitness_range',
      'travel_and_hobbies_range', 'genre_range'
    ];
  
    arrayFields.forEach(fieldName => {
      if (data[fieldName]) {
        data[fieldName] = processArrayField(data[fieldName]);
      }
    });
  
    return data;
  }


app.post('/sendData',async(req,res)=>{
let {...data}=req.body;
data = processDataArrays(data);
    try{

       data.cities=data.cities.flat(Infinity);
          console.log(data)

        const mailOptions = {
            from: 'support@enrichifydata.com',
            to: 'shipmate2134@gmail.com',
            subject: 'New lead from Datazapp tool',
            html: `
             <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lead Notification - ENRICHIFY</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            background: linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%);
            margin: 0;
            padding: 20px 0;
            min-height: 100vh;
        }
        
        .email-container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #9333ea 0%, #4f46e5 100%);
            padding: 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -20%;
            width: 200px;
            height: 200px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            z-index: 1;
        }
        
        .header-content {
            position: relative;
            z-index: 2;
        }
       .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    width: 100%;
}

.logo {
    height: 60px;
    width: auto;
    display: block;
    margin: 0 auto;
    max-width: 100%;
}
        
        .brand-name {
            font-size: 28px;
            font-weight: 700;
            color: white;
            margin: 0;
        }
        
        .header h1 {
            color: white;
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        .header p {
            color: #e9d5ff;
            font-size: 16px;
            margin: 0;
            opacity: 0.9;
        }
        
        .status-badge {
            display: inline-block;
            background: rgba(39, 174, 96, 0.2);
            color: #27ae60;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            margin-top: 15px;
            border: 1px solid rgba(39, 174, 96, 0.3);
        }
        
        .content {
            padding: 0;
        }
        
        .section {
            padding: 30px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .section:last-child {
            border-bottom: none;
        }
        
        .section-title {
            color: #e2e8f0;
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
        }
        
        .section-icon {
            width: 24px;
            height: 24px;
            margin-right: 10px;
            opacity: 0.8;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        @media (max-width: 600px) {
            .info-grid {
                grid-template-columns: 1fr;
                gap: 15px;
            }
        }
        
        .info-item {
            background: rgba(30, 41, 59, 0.6);
            border: 1px solid rgba(71, 85, 105, 0.5);
            border-radius: 8px;
            padding: 16px;
            transition: all 0.2s ease;
        }
        
        .info-item:hover {
            background: rgba(30, 41, 59, 0.8);
            border-color: rgba(147, 51, 234, 0.3);
        }
        
        .info-label {
            color: #94a3b8;
            font-size: 12px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 6px;
        }
        
        .info-value {
            color: #e2e8f0;
            font-size: 14px;
            font-weight: 500;
            word-break: break-word;
        }
        
        .info-value.success {
            color: #27ae60;
            font-weight: 600;
        }
        
        .info-value.empty {
            color: #64748b;
            font-style: italic;
        }
        
        .list-value {
            color: #e2e8f0;
            font-size: 14px;
            line-height: 1.5;
        }
        
        .list-item {
            background: rgba(147, 51, 234, 0.1);
            color: #c084fc;
            padding: 4px 8px;
            border-radius: 4px;
            display: inline-block;
            margin: 2px 4px 2px 0;
            font-size: 12px;
        }
        
        .next-steps {
            background: linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%);
            border: 1px solid rgba(147, 51, 234, 0.2);
            border-radius: 12px;
            padding: 25px;
            margin: 20px 0;
        }
        
        .next-steps h3 {
            color: #e2e8f0;
            font-size: 18px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }
        
        .next-steps ul {
            list-style: none;
            padding: 0;
        }
        
        .next-steps li {
            color: #cbd5e1;
            margin-bottom: 10px;
            padding-left: 24px;
            position: relative;
        }
        
        .next-steps li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #27ae60;
            font-weight: bold;
        }
        
        .footer {
            background: rgba(15, 23, 42, 0.8);
            padding: 25px 30px;
            text-align: center;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .footer p {
            color: #94a3b8;
            font-size: 13px;
            margin: 0;
        }
        
        .timestamp {
            background: rgba(147, 51, 234, 0.1);
            border: 1px solid rgba(147, 51, 234, 0.2);
            border-radius: 6px;
            padding: 8px 12px;
            display: inline-block;
            margin-top: 10px;
        }
        
        .timestamp-label {
            color: #94a3b8;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .timestamp-value {
            color: #e2e8f0;
            font-size: 13px;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="header-content">
                <div class="logo-container">
                    <img src="https://www.enrichifydata.com/wp-content/uploads/2024/11/WhatsApp_Image_2024-11-24_at_8.44.26_PM-removebg-preview.png" 
                         alt="ENRICHIFY Logo" class="logo">
                </div>
                <h1>Lead Notification Sent Successfully</h1>
                <p style="color:black !important;">Lead confirmation has been delivered to your client</p>
                <div class="status-badge">✓ Successfully Delivered</div>
            </div>
        </div>
        
        <div class="content">
            <div class="section">
                <h2 class="section-title">
                    <svg class="section-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                    </svg>
                    Client Information
                </h2>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Lead Source</div>
                        <div class="info-value">ENRICHIFY Data Platform</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Campaign User</div>
                        <div class="info-value">${data?.user?.name ? `${data.user.name} (${data.user.email})` : data?.user?.email || 'N/A'}</div>
                    </div>
                </div>
                
                <div class="timestamp">
                    <div class="timestamp-label">Notification Sent</div>
                    <div class="timestamp-value">${new Date().toLocaleString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric', 
                        hour: '2-digit', 
                        minute: '2-digit',
                        timeZoneName: 'short'
                    })}</div>
                </div>
            </div>

            <div class="section">
                <h2 class="section-title">
                    <svg class="section-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                    </svg>
                    Campaign Configuration
                </h2>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Campaign Type</div>
                        <div class="info-value">${data?.campaign_type || 'Standard Lead Generation'}</div>
                    </div>
                    
                    <div class="info-item">
                        <div class="info-label">Phone Options</div>
                        <div class="info-value">${data?.phone_options || 'Default settings'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Deduplication</div>
                        <div class="info-value">${data?.dedup_option || 'Standard dedup'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Suppression Option</div>
                        <div class="info-value">${data?.supression_option || 'Not specified'}</div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2 class="section-title">
                    <svg class="section-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                    </svg>
                    Geographic Targeting
                </h2>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Zip Codes</div>
                        <div class="list-value">
                            ${data?.zip_codes?.length > 0 ? 
                                data.zip_codes.map(item => `<span class="list-item">${item}</span>`).join('') : 
                                '<span class="info-value empty">None selected</span>'
                            }
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">States</div>
                        <div class="list-value">
                            ${data?.states?.length > 0 ? 
                                data.states.map(item => `<span class="list-item">${item}</span>`).join('') : 
                                '<span class="info-value empty">None selected</span>'
                            }
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Cities</div>
                        <div class="list-value">
                            ${data?.cities?.length > 0 ? 
                                data.cities.map(item => `<span class="list-item">${item}</span>`).join('') : 
                                '<span class="info-value empty">None selected</span>'
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2 class="section-title">
                    <svg class="section-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                    </svg>
                    Demographics & Targeting
                </h2>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Dwelling Type</div>
                        <div class="list-value">
                            ${data?.dwelling_type?.length > 0 ? 
                                data.dwelling_type.map(item => `<span class="list-item">${item}</span>`).join('') : 
                                '<span class="info-value empty">None selected</span>'
                            }
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Home Owner Status</div>
                        <div class="list-value">
                            ${data?.home_owner?.length > 0 ? 
                                data.home_owner.map(item => `<span class="list-item">${item}</span>`).join('') : 
                                '<span class="info-value empty">None selected</span>'
                            }
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Household Income</div>
                        <div class="list-value">
                            ${data?.hh_income?.length > 0 ? 
                                data.hh_income.map(item => `<span class="list-item">${item}</span>`).join('') : 
                                '<span class="info-value empty">None selected</span>'
                            }
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Age Group</div>
                        <div class="list-value">
                            ${data?.age_group?.length > 0 ? 
                                data.age_group.map(item => `<span class="list-item">${item}</span>`).join('') : 
                                '<span class="info-value empty">None selected</span>'
                            }
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Credit Rating</div>
                        <div class="list-value">
                            ${data?.credit_rating?.length > 0 ? 
                                data.credit_rating.map(item => `<span class="list-item">${item}</span>`).join('') : 
                                '<span class="info-value empty">None selected</span>'
                            }
                        </div>
                    </div>
                    
                    <div class="info-item">
                        <div class="info-label">Occupation</div>
                        <div class="info-value">${data?.occupation || 'Not specified'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Ethnic Code</div>
                        <div class="list-value">
                            ${data?.ethnic_code?.length > 0 ? 
                                data.ethnic_code.map(item => `<span class="list-item">${item}</span>`).join('') : 
                                '<span class="info-value empty">None selected</span>'
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2 class="section-title">
                    <svg class="section-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
                    </svg>
                    Donor & Affinity Data
                </h2>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Propensity to Give</div>
                        <div class="list-value">
                            ${data?.propensity_to_give?.length > 0 ? 
                                data.propensity_to_give.map(item => `<span class="list-item">${item}</span>`).join('') : 
                                '<span class="info-value empty">None selected</span>'
                            }
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Donor Affinity Range</div>
                        <div class="list-value">
                            ${data?.donor_affinity_range?.length > 0 ? 
                                data.donor_affinity_range.map(item => `<span class="list-item">${item}</span>`).join('') : 
                                '<span class="info-value empty">None selected</span>'
                            }
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Donor Affinity Operator</div>
                        <div class="info-value">${data?.donor_affinity_op || 'AND'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Turning 65</div>
                        <div class="list-value">
                            ${data?.turning_65?.length > 0 ? 
                                data.turning_65.map(item => `<span class="list-item">${item}</span>`).join('') : 
                                '<span class="info-value empty">None selected</span>'
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2 class="section-title">
                    <svg class="section-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                        <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
                    </svg>
                    Additional Targeting Options
                </h2>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Pet Owner Operator</div>
                        <div class="info-value">${data?.pet_op || 'AND'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Pet Owner Range</div>
                        <div class="list-value">
                            ${data?.pet_range?.length > 0 ? 
                                data.pet_range.map(item => `<span class="list-item">${item}</span>`).join('') : 
                                '<span class="info-value empty">None selected</span>'
                            }
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Propensity Operator</div>
                        <div class="info-value">${data?.propensity_op || 'AND'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Propensity Range</div>
                        <div class="list-value">
                            ${data?.propensity_range?.length > 0 ? 
                                data.propensity_range.map(item => `<span class="list-item">${item}</span>`).join('') : 
                                '<span class="info-value empty">None selected</span>'
                            }
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Outdoor Operator</div>
                        <div class="info-value">${data?.outdoor_op || 'AND'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Outdoor Range</div>
                        <div class="list-value">
                            ${data?.outdoor_range?.length > 0 ? 
                                data.outdoor_range.map(item => `<span class="list-item">${item}</span>`).join('') : 
                                '<span class="info-value empty">None selected</span>'
                            }
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Sports & Fitness Operator</div>
                        <div class="info-value">${data?.sports_and_fitness_op || 'AND'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Sports & Fitness Range</div>
                        <div class="list-value">
                            ${data?.sports_and_fitness_range?.length > 0 ? 
                                data.sports_and_fitness_range.map(item => `<span class="list-item">${item}</span>`).join('') : 
                                '<span class="info-value empty">None selected</span>'
                            }
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Travel & Hobbies Operator</div>
                        <div class="info-value">${data?.travel_and_hobbies_op || 'AND'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Travel & Hobbies Range</div>
                        <div class="list-value">
                            ${data?.travel_and_hobbies_range?.length > 0 ? 
                                data.travel_and_hobbies_range.map(item => `<span class="list-item">${item}</span>`).join('') : 
                                '<span class="info-value empty">None selected</span>'
                            }
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Genre Operator</div>
                        <div class="info-value">${data?.genre_op || 'AND'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Genre Range</div>
                        <div class="list-value">
                            ${data?.genre_range?.length > 0 ? 
                                data.genre_range.map(item => `<span class="list-item">${item}</span>`).join('') : 
                                '<span class="info-value empty">None selected</span>'
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div class="section">
                <div class="next-steps">
                    <h3>
                        <svg class="section-icon" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                        Next Steps
                    </h3>
                    <ul>
                        <li>Client notification has been successfully delivered</li>
                        <li>Lead details have been recorded in the ENRICHIFY system</li>
                        <li>Follow up with the client within 24 hours for optimal results</li>
                        <li>Campaign configuration has been saved for future reference</li>
                        <li>Monitor lead engagement through the dashboard</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>This is an automated notification from ENRICHIFY Data Platform.</p>
            <p>Please do not reply to this email. For support, contact your account manager.</p>
        </div>
    </div>
</body>
</html>
            `
          };
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user:'support@enrichifydata.com', 
              pass: 'dpephjzfqdqyqhec' 
            }
          });
          const info = await transporter.sendMail(mailOptions);


await dataModel.create(data)
return res.status(200).json({
    message:"Sucess"
})
    }catch(e){
        console.log(e.message)
        return res.status(400).json({
            error:e.message
        })
    }
})

app.post('/register',async(req,res)=>{
    try{
    let {...data}=req.body;
    let alreadyExists=await userModel.findOne({email:data.email})
    if(alreadyExists){
        return res.status(400).json({
            error:"User already exists"
        })
    }
await userModel.create(data)       

const mailOptions = {
  from: 'support@enrichifydata.com',
  to: 'shipmate2134@gmail.com',
  subject: 'New user registered',
  html: `
   <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to ENRICHIFY</title>
<style>         
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  background: linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%);
  margin: 0;
  padding: 20px 0;
  min-height: 100vh;
}

.email-container {
  max-width: 800px;
  margin: 0 auto;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.header {
  background: linear-gradient(135deg, #9333ea 0%, #4f46e5 100%);
  padding: 30px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.header::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  z-index: 1;
}

.header-content {
  position: relative;
  z-index: 2;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
}

.logo {
  height: 60px;
  width: auto;
  display: block;
  margin: 0 auto;
  max-width: 100%;
}

.brand-name {
  font-size: 28px;
  font-weight: 700;
  color: white;
  margin: 0;
}

.header h1 {
  color: white;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
}

.header p {
  color: #e9d5ff;
  font-size: 16px;
  margin: 0;
  opacity: 0.9;
}

.status-badge {
  display: inline-block;
  background: rgba(39, 174, 96, 0.2);
  color: #27ae60;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-top: 15px;
  border: 1px solid rgba(39, 174, 96, 0.3);
}

.content {
  padding: 0;
}

.section {
  padding: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.section:last-child {
  border-bottom: none;
}

.section-title {
  color: #e2e8f0;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.section-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
  opacity: 0.8;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

@media (max-width: 600px) {
  .info-grid {
      grid-template-columns: 1fr;
      gap: 15px;
  }
}

.info-item {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(71, 85, 105, 0.5);
  border-radius: 8px;
  padding: 16px;
  transition: all 0.2s ease;
}

.info-item:hover {
  background: rgba(30, 41, 59, 0.8);
  border-color: rgba(147, 51, 234, 0.3);
}

.info-label {
  color: #94a3b8;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}

.info-value {
  color: #e2e8f0;
  font-size: 14px;
  font-weight: 500;
  word-break: break-word;
}

.info-value.success {
  color: #27ae60;
  font-weight: 600;
}

.info-value.empty {
  color: #64748b;
  font-style: italic;
}

.list-value {
  color: #e2e8f0;
  font-size: 14px;
  line-height: 1.5;
}

.list-item {
  background: rgba(147, 51, 234, 0.1);
  color: #c084fc;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
  margin: 2px 4px 2px 0;
  font-size: 12px;
}

.next-steps {
  background: linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%);
  border: 1px solid rgba(147, 51, 234, 0.2);
  border-radius: 12px;
  padding: 25px;
  margin: 20px 0;
}

.next-steps h3 {
  color: #e2e8f0;
  font-size: 18px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.next-steps ul {
  list-style: none;
  padding: 0;
}

.next-steps li {
  color: #cbd5e1;
  margin-bottom: 10px;
  padding-left: 24px;
  position: relative;
}

.next-steps li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #27ae60;
  font-weight: bold;
}

.footer {
  background: rgba(15, 23, 42, 0.8);
  padding: 25px 30px;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer p {
  color: #94a3b8;
  font-size: 13px;
  margin: 0;
}

.timestamp {
  background: rgba(147, 51, 234, 0.1);
  border: 1px solid rgba(147, 51, 234, 0.2);
  border-radius: 6px;
  padding: 8px 12px;
  display: inline-block;
  margin-top: 10px;
}

.timestamp-label {
  color: #94a3b8;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.timestamp-value {
  color: #e2e8f0;
  font-size: 13px;
  font-weight: 500;
}

.welcome-message {
  font-size: 16px;
  color: #e2e8f0;
  margin-bottom: 25px;
  line-height: 1.6;
}

.cta-button {
  display: inline-block;
  background: linear-gradient(135deg, #9333ea 0%, #4f46e5 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  margin: 15px 0;
  transition: all 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
  
  
</style>
</head>
<body>
<div class="email-container">
<div class="header">
  <div class="header-content">
      <div class="logo-container">
          <img src="https://www.enrichifydata.com/wp-content/uploads/2024/11/WhatsApp_Image_2024-11-24_at_8.44.26_PM-removebg-preview.png" 
               alt="ENRICHIFY Logo" class="logo">
      </div>
      <h1>Welcome, ${data.name}</h1>
      <p>Your account has been successfully created</p>
      <div class="status-badge">✓ Registration Complete</div>
  </div>
</div>

<div class="content">
  <div class="section">
      <p class="welcome-message">
          Thank you for registering with ENRICHIFY. We're excited to have you on board! 
          Below you'll find your account details. If you have any questions, don't hesitate 
          to contact our support team.
      </p>
      
      <div class="info-grid">
          <div class="info-item">
              <div class="info-label">Full Name</div>
              <div class="info-value">${data.name}</div>
          </div>
          
          <div class="info-item">
              <div class="info-label">Email Address</div>
              <div class="info-value">${data.email}</div>
          </div>
          
          <div class="info-item">
              <div class="info-label">Phone Number</div>
              <div class="info-value">${data.phone}</div>
          </div>
          
          <div class="info-item">
              <div class="info-label">Address</div>
              <div class="info-value">${data.address}</div>
          </div>
      </div>
      
      <div style="text-align: center; margin-top: 30px;">
          <a href="https://enrichify-data-request.vercel.app/login" class="cta-button">Login to Your Account</a>
      </div>
  </div>
  
  <div class="section">
      <div class="next-steps">
          <h3>Next Steps</h3>
          <ul>
              <li>Verify your email address (if required)</li>
              <li>Complete your profile setup</li>
              <li>Explore our platform features</li>
              <li>Connect with our support team for any assistance</li>
          </ul>
      </div>
  </div>
</div>

<div class="footer">
  <p>This is an automated message from ENRICHIFY. Please do not reply to this email.</p>
  <p>For support, contact <a href="mailto:support@enrichifydata.com" style="color: #c084fc; text-decoration: none;">support@enrichifydata.com</a></p>
 
</div>
</div>
</body>
</html>
  `
};
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:'support@enrichifydata.com', 
    pass: 'dpephjzfqdqyqhec' 
  }
});
const info = await transporter.sendMail(mailOptions);

return res.status(200).json({
    message:"User created sucessfully"
})
    }catch(e){
        return res.status(400).json({
            error:e.message
        })
    }
})


app.post('/resetpassword',async(req,res)=>{
let {password,email}=req.body;
    try{
await userModel.ipdateOne({email},{
    $set:{
        password
    }
})

return res.status(200).json({
    message:"Sucessfully updated password"
})
    }catch(e){
        return res.status(400).json({
            error:"Something went wrong please try again"
        })
    }
})

app.post('/forgetpassword',async(req,res)=>{
    let {email}=req.body;
    console.log(email)
let user=await userModel.findOne({email})
console.log(user)
    if(!user){
        return res.status(400).json({
            error:"Invalid email"
        })
    }

try{
    const mailOptions = {
        from: 'support@enrichifydata.com',
        to: email,
        subject: 'Password reset link',
        html: `
     <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Reset Your Password - ENRICHIFY</title>
<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        background: linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%);
        margin: 0;
        padding: 20px 0;
        min-height: 100vh;
    }
    
    .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(20px);
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1);
    }
    
    .header {
        background: linear-gradient(135deg, #9333ea 0%, #4f46e5 100%);
        padding: 30px;
        text-align: center;
        position: relative;
        overflow: hidden;
    }
    
    .header::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -20%;
        width: 200px;
        height: 200px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        z-index: 1;
    }
    
    .header-content {
        position: relative;
        z-index: 2;
    }
    
    .logo-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        width: 100%;
    }

    .logo {
        height: 60px;
        width: auto;
        display: block;
        margin: 0 auto;
        max-width: 100%;
    }
    
    .header h1 {
        color: white;
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 8px;
    }
    
    .header p {
        color: #e9d5ff;
        font-size: 16px;
        margin: 0;
        opacity: 0.9;
    }
    
    .lock-icon {
        width: 48px;
        height: 48px;
        margin: 15px auto;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .content {
        padding: 40px 30px;
    }
    
    .greeting {
        color: #e2e8f0;
        font-size: 18px;
        margin-bottom: 20px;
    }
    
    .message {
        color: #cbd5e1;
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 30px;
    }
    
    .reset-button {
        display: block;
        width: 100%;
        max-width: 280px;
        margin: 30px auto;
        padding: 16px 32px;
        background: linear-gradient(135deg, #9333ea 0%, #4f46e5 100%);
        color: white;
        text-decoration: none;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        text-align: center;
        transition: all 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 4px 20px rgba(147, 51, 234, 0.3);
    }
    
    .reset-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(147, 51, 234, 0.4);
    }
    
    .alternative-section {
        background: rgba(30, 41, 59, 0.6);
        border: 1px solid rgba(71, 85, 105, 0.5);
        border-radius: 12px;
        padding: 20px;
        margin: 30px 0;
    }
    
    .alternative-section h3 {
        color: #e2e8f0;
        font-size: 16px;
        margin-bottom: 10px;
    }
    
    .alternative-section p {
        color: #94a3b8;
        font-size: 14px;
        margin-bottom: 15px;
    }
    
    .link-text {
        background: rgba(15, 23, 42, 0.8);
        border: 1px solid rgba(147, 51, 234, 0.3);
        border-radius: 8px;
        padding: 12px;
        word-break: break-all;
        font-family: 'Courier New', monospace;
        font-size: 13px;
        color: #c084fc;
    }
    
    .security-notice {
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.3);
        border-radius: 12px;
        padding: 20px;
        margin: 30px 0;
    }
    
    .security-notice h3 {
        color: #fca5a5;
        font-size: 16px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
    }
    
    .security-notice ul {
        color: #fecaca;
        font-size: 14px;
        margin-left: 20px;
    }
    
    .security-notice li {
        margin-bottom: 8px;
    }
    
    .expiry-info {
        background: rgba(147, 51, 234, 0.1);
        border: 1px solid rgba(147, 51, 234, 0.2);
        border-radius: 8px;
        padding: 15px;
        text-align: center;
        margin: 25px 0;
    }
    
    .expiry-info .label {
        color: #94a3b8;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 5px;
    }
    
    .expiry-info .time {
        color: #e2e8f0;
        font-size: 18px;
        font-weight: 600;
    }
    
    .footer {
        background: rgba(15, 23, 42, 0.8);
        padding: 25px 30px;
        text-align: center;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .footer p {
        color: #94a3b8;
        font-size: 13px;
        margin: 8px 0;
    }
    
    .support-info {
        color: #64748b;
        font-size: 12px;
        margin-top: 15px;
    }
</style>
</head>
<body>
<div class="email-container">
    <div class="header">
        <div class="header-content">
            <div class="logo-container">
                <img src="https://www.enrichifydata.com/wp-content/uploads/2024/11/WhatsApp_Image_2024-11-24_at_8.44.26_PM-removebg-preview.png" 
                     alt="ENRICHIFY Logo" class="logo">
            </div>
           
            <h1>Reset Your Password</h1>
            <p>We received a request to reset your password</p>
        </div>
    </div>
    
    <div class="content">
        <div class="greeting">
            Hello there! 👋
        </div>
        
        <div class="message">
            We received a request to reset the password for your ENRICHIFY account. If you made this request, click the button below to create a new password. If you didn't request a password reset, you can safely ignore this email.
        </div>
        
        <a href=https://enrichify-data-request.vercel.app/resetpassword?id=${user._id} class="reset-button">
            Reset My Password
        </a>
        
        <div class="expiry-info">
            <div class="label">Link Expires In</div>
            <div class="time">24 Hours</div>
        </div>
        
        <div class="alternative-section">
            <h3>Button not working?</h3>
            <p>If the button above doesn't work, copy and paste this link into your browser:</p>
            <div class="link-text">
                https://enrichify-data-request.vercel.app/resetpassword?id=${user._id}
            </div>
        </div>
        
        <div class="security-notice">
            <h3>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20" style="margin-right: 8px;">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                Security Notice
            </h3>
            <ul>
                <li>This link will expire in 24 hours for security reasons</li>
                <li>Only use this link if you requested a password reset</li>
                <li>Never share this link with anyone else</li>
                <li>Contact support if you didn't request this reset</li>
            </ul>
        </div>
    </div>
    
    <div class="footer">
        <p><strong>This is an automated email from ENRICHIFY.</strong></p>
        <p>If you didn't request a password reset, please ignore this email or contact our support team.</p>
        
        <div class="support-info">
            <p>Need help? Contact us at support@enrichifydata.com</p>
            <p>© 2025 ENRICHIFY Data Platform. All rights reserved.</p>
        </div>
    </div>
</div>
</body>
</html>
        `
      };
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user:'support@enrichifydata.com', 
          pass: 'dpephjzfqdqyqhec' 
        }
      });
      const info = await transporter.sendMail(mailOptions);
console.log(info)

return res.status(200).json({
    message:"Password reset link sucessfully sent"
})
    }catch(e){
        return res.status(400).json({
            error:"Something went wrong please try again"
        })
    }
})

app.post('/login',async(req,res)=>{
let {email,password}=req.body;
    try{
let emailFound=await userModel.findOne({email})
if(!emailFound){
    return res.status(400).json({
        error:"Email not found"
    })
}

let passwordFound=await userModel.findOne({password})
if(!passwordFound){
    return res.status(400).json({
        error:"Invalid password"
    })
}

return res.status(200).json({
    user:emailFound
})
    }catch(e){
        return res.status(400).json({
            error:e.message
        })
    }
})

app.listen(5000,()=>{
    console.log(`Listening to port 5000`)
})