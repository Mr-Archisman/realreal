import { MENU_ABOUT } from '@/common/mocks/about';

interface AboutProps {}

export default function About({}: AboutProps) {
  return (
    <section
      id=''
      className='w-full bg-[#0D0C1E] text-white px-8 lg:px-20 2xl:px-48 py-28 '
    >
      <div className='flex flex-col lg:flex-row justify-between gap-10'>
        {MENU_ABOUT.map((item, index) => (
          <div
            key={index}
            className='flex flex-col lg:flex-row items-center gap-x-8'
          >
            <h1 className='font-black text-3xl 2xl:text-6xl'>{item.count}</h1>
            <p className='text-neutral-300 w-auto xl:w-[200px]'>{item.decs}</p>
          </div>
        ))}
      </div>
      <hr className='my-16 lg:my-24' />
      <div className='w-full flex flex-col lg:flex-row gap-y-4 justify-between px-0 md:px-16 lg:px-0'>
        <div className='flex-1 text-[14px] xl:text-base leading-[2] xl:leading-loose text-neutral-300'>
          <h3 className='text-white font-semibold text-lg'>Our Mission</h3>

          <p className='mt-4 text-neutral-500'>
            Our mission is to simplify real estate transactions and empower our
            clients with expert guidance, transparency, and personalized
            service. Whether you are a first-time homebuyer or an experienced
            investor, we are here to help you make informed decisions.
          </p>

          <p className='mt-4 text-blue-400 font-medium'>
            Let’s turn your real estate dreams into reality! 🚀
          </p>
        </div>
        <div className='flex-1 text-[14px] xl:text-base leading-[2] xl:leading-loose text-neutral-300'>
          <h3 className='text-white font-semibold text-lg'>Why Choose Us?</h3>

          <div className='mt-4 space-y-3'>
            <div className='flex items-start gap-2'>
              <span className='text-blue-400 text-lg'>✔</span>
              <div>
                <h4 className='text-white font-medium'>
                  Experience You Can Trust
                </h4>
                <p className='text-gray-500'>
                  With a proven track record in the real estate industry, we
                  bring market knowledge and insights that benefit our clients.
                </p>
              </div>
            </div>

            <div className='flex items-start gap-2'>
              <span className='text-blue-400 text-lg'>✔</span>
              <div>
                <h4 className='text-white font-medium'>
                  Personalized Solutions
                </h4>
                <p className='text-gray-500'>
                  Every client is unique, and so is our approach. We tailor our
                  services to match your needs, whether you’re buying, selling,
                  or renting.
                </p>
              </div>
            </div>

            <div className='flex items-start gap-2'>
              <span className='text-blue-400 text-lg'>✔</span>
              <div>
                <h4 className='text-white font-medium'>
                  Extensive Property Listings
                </h4>
                <p className='text-gray-500'>
                  From luxurious villas to budget-friendly apartments, our wide
                  range of listings ensures you find the perfect match.
                </p>
              </div>
            </div>

            <div className='flex items-start gap-2'>
              <span className='text-blue-400 text-lg'>✔</span>
              <div>
                <h4 className='text-white font-medium'>
                  Hassle-Free Transactions
                </h4>
                <p className='text-gray-500'>
                  We handle everything, from negotiations to paperwork, making
                  the process smooth and efficient.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
