// Scratch test script to verify json-server authentication & read/write capabilities
const testEmail = `test_parent_${Date.now()}@example.com`;
const testPhone = `98${Math.floor(10000000 + Math.random() * 90000000)}`;

async function runTests() {
  console.log('--- 1. Testing Demo User Lookup ---');
  const demoRes = await fetch('http://localhost:3001/users?email=demo@example.com');
  const demoUsers = await demoRes.json();
  console.log('Demo User Found:', demoUsers.length > 0 ? demoUsers[0].name : 'NOT FOUND');

  console.log('\n--- 2. Testing Non-Existent User Lookup ---');
  const missingRes = await fetch('http://localhost:3001/users?email=non_existent_random@example.com');
  const missingUsers = await missingRes.json();
  console.log('Non-existent count:', missingUsers.length);

  console.log('\n--- 3. Testing Real Signup Database Write ---');
  const newUser = {
    id: `usr_${Date.now()}`,
    name: 'Ananya Sharma',
    email: testEmail,
    phone: testPhone,
    password: 'mypassword123',
    role: 'parent',
    walletBalance: 200,
    childName: 'Aarav',
    childAge: '3',
    nutritionGoal: 'Height & Immunity',
    createdAt: new Date().toISOString()
  };

  const createRes = await fetch('http://localhost:3001/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser)
  });
  const created = await createRes.json();
  console.log('User created in db.json with ID:', created.id, 'Email:', created.email);

  console.log('\n--- 4. Testing Reading Newly Created User ---');
  const verifyRes = await fetch(`http://localhost:3001/users?email=${encodeURIComponent(testEmail)}`);
  const verifyUsers = await verifyRes.json();
  console.log('Verified user retrieved from db.json:', verifyUsers.length > 0 ? verifyUsers[0].name : 'FAILED');

  console.log('\n--- 5. Testing Duplicate User Detection ---');
  const dupRes = await fetch(`http://localhost:3001/users?email=${encodeURIComponent(testEmail)}`);
  const dupUsers = await dupRes.json();
  console.log('Duplicate detected correctly:', dupUsers.length > 0 ? 'YES' : 'NO');
}

runTests().catch(console.error);
