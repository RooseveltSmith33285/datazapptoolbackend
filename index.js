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

app.post('/sendData',async(req,res)=>{
let {...data}=req.body;
    try{

       data.cities=data.cities.flat(Infinity);
          console.log(data)

        const mailOptions = {
            from: 'leads@enrichifydata.com',
            to: 'shipmate2134@gmail.com',
            subject: 'Live Chat Lead Email Sent to Client',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
                  Lead Notification Sent to Client
                </h2>
                
                <p style="color: #2c3e50; margin-bottom: 20px;">
                  This is to inform you that a lead notification email has been successfully sent to the client.
                </p>
                
                <!-- Client Information -->
                <h3 style="color: #2c3e50; margin-top: 30px;">Client Information</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa; width: 30%;">Client Name</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.FirstName || data?.NameFull?.split(' ')[0] || 'N/A'} ${data?.LastName || data?.NameFull?.split(' ')[1] || ''}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Client Email</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.EmailAddress || data?.Email || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Notification Type</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">Lead Confirmation</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Lead Source</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">ENRICHIFY</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Status</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6; color: #27ae60;">Successfully Sent</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Sent At</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${new Date().toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">User</td>
<td style="padding: 10px; border: 1px solid #dee2e6;">${data?.user?.name || data?.user?.email || 'N/A'}</td>

<td style="padding: 10px; border: 1px solid #dee2e6;">${data?.user?.name ? `${data.user.name} (${data.user.email})` : 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Save Name</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.save_name || 'N/A'}</td>
                  </tr>
                </table>
          
                <!-- Campaign Configuration -->
                <h3 style="color: #2c3e50; margin-top: 30px;">Campaign Configuration</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa; width: 30%;">Campaign Type</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.campaign_type || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Phone Options</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.phone_options || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Dedup Option</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.dedup_option || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Suppression Option</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.supression_option || 'Not specified'}</td>
                  </tr>
                </table>
          
                <!-- Geographic Targeting -->
                <h3 style="color: #2c3e50; margin-top: 30px;">Geographic Targeting</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa; width: 30%;">Zip Codes</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.zip_codes?.length > 0 ? data.zip_codes.join(', ') : 'None selected'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">States</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.states?.length > 0 ? data.states.join(', ') : 'None selected'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Cities</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.cities?.length > 0 ? data.cities.join(', ') : 'None selected'}</td>
                  </tr>
                </table>
          
                <!-- Demographics -->
                <h3 style="color: #2c3e50; margin-top: 30px;">Demographics</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa; width: 30%;">Dwelling Type</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.dwelling_type?.length > 0 ? data.dwelling_type.join(', ') : 'None selected'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Home Owner</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.home_owner?.length > 0 ? data.home_owner.join(', ') : 'None selected'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Household Income</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.hh_income?.length > 0 ? data.hh_income.join(', ') : 'None selected'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Individuals</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.indivisuals?.length > 0 ? data.indivisuals.join(', ') : 'None selected'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Marital Status</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.martial_status?.length > 0 ? data.martial_status.join(', ') : 'None selected'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Age Group</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.age_group?.length > 0 ? data.age_group.join(', ') : 'None selected'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Credit Rating</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.credit_rating?.length > 0 ? data.credit_rating.join(', ') : 'None selected'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Occupation</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.occupation || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Ethnic Code</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.ethnic_code?.length > 0 ? data.ethnic_code.join(', ') : 'None selected'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Turning 65</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.turning_65?.length > 0 ? data.turning_65.join(', ') : 'None selected'}</td>
                  </tr>
                </table>
          
                <!-- Donor & Propensity Information -->
                <h3 style="color: #2c3e50; margin-top: 30px;">Donor & Propensity Information</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa; width: 30%;">Propensity to Give</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.propensity_to_give?.length > 0 ? data.propensity_to_give.join(', ') : 'None selected'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Donor Affinity Range</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.donor_affinity_range?.length > 0 ? data.donor_affinity_range.join(', ') : 'None selected'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Donor Affinity Operator</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.donor_affinity_op || 'AND'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Propensity Range</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.propensity_range?.length > 0 ? data.propensity_range.join(', ') : 'None selected'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Propensity Operator</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.propensity_op || 'AND'}</td>
                  </tr>
                </table>
          
                <!-- Interest Categories -->
                <h3 style="color: #2c3e50; margin-top: 30px;">Interest Categories</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa; width: 30%;">Pet Range</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.pet_range?.length > 0 ? data.pet_range.join(', ') : 'None selected'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Pet Operator</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.pet_op || 'AND'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Outdoor Range</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.outdoor_range?.length > 0 ? data.outdoor_range.join(', ') : 'None selected'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Outdoor Operator</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.outdoor_op || 'AND'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Sports & Fitness Range</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.sports_and_fitness_range?.length > 0 ? data.sports_and_fitness_range.join(', ') : 'None selected'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Sports & Fitness Operator</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.sports_and_fitness_op || 'AND'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Travel & Hobbies Range</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.travel_and_hobbies_range?.length > 0 ? data.travel_and_hobbies_range.join(', ') : 'None selected'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Travel & Hobbies Operator</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.travel_and_hobbies_op || 'AND'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Genre Range</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.genre_range?.length > 0 ? data.genre_range.join(', ') : 'None selected'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; background-color: #f8f9fa;">Genre Operator</td>
                    <td style="padding: 10px; border: 1px solid #dee2e6;">${data?.genre_op || 'AND'}</td>
                  </tr>
                </table>
          
                <div style="margin-top: 30px; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #3498db;">
                  <h4 style="margin-top: 0; color: #2c3e50;">Next Steps</h4>
                  <ul style="margin-bottom: 0; color: #7f8c8d;">
                    <li>The client has been notified about their lead submission</li>
                    <li>Lead details have been recorded in the system</li>
                    <li>Please follow up with the client within 24 hours</li>
                    <li>Campaign configuration has been saved with the selected criteria</li>
                  </ul>
                </div>
                
                <p style="margin-top: 20px; color: #7f8c8d; font-size: 0.9em;">
                  This is an automated notification. Please do not reply to this email.
                </p>
              </div>
            `
          };
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user:'leads@enrichifydata.com', 
              pass: 'obeahkmflwnesojn' 
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
return res.status(200).json({
    message:"User created sucessfully"
})
    }catch(e){
        return res.status(400).json({
            error:e.message
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