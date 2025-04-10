const verifyEmailTemplate = ({name, url}) => {
    return `
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
        <h2 style="color: #333;">Dear ${name},</h2>
        <p>Thanks for registering up in Binkeyit !</p>
        <p>Please click on the below link to verify your email address.</p>
        <a href="${url}" style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Verify Email</a>
        <p>If you did not create an account, no further action is required.</p>
        <p>Thanks</p>
    </div>
    `;
};
export default verifyEmailTemplate;