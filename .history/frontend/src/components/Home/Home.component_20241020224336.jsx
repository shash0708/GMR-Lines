const Home = () => {
  const navigate = useNavigate();

  useDocumentTitle('Aviation Logbook');

  const [ameNumber, setAmeNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const getTimeBasedGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour < 12) {
        return 'Good Morning';
      } else if (currentHour < 18) {
        return 'Good Afternoon';
      } else {
        return 'Good Evening';
      }
    };

    setGreeting(getTimeBasedGreeting());

    const fetchAmeNumber = async () => {
      try {
        const response = await fetch(`${URL}/api/getuser`, {
          method: 'GET',
          headers: {
            'auth-token': localStorage.getItem('token'),
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setAmeNumber(data.AME);
      } catch (error) {
        console.error('Error fetching AME number:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAmeNumber();
  }, []);

  return (
    <div className='Home'>
      <header className='hero-section'>
        <h1>AirCrew</h1>

        {/* Insert image below the heading */}
        <img src='assests/bg.jpg' alt='AirCrew logo' className='aircrew-image' />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <h3 className='ame-number'>{ameNumber}</h3>
        )}
      </header>
      <div className='Container'>
        <h1>How  we can help</h1>
       
        <div>
          <p>
            We are a team of experienced pilots<br/>
            xxxxxxxxxxxxxxxx
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
