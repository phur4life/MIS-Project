import { Tab } from '@headlessui/react';

const TabSection = () => {
  return (
    <Tab.Group>
      <Tab.List className="flex space-x-4">
        <Tab
          className={({ selected }) =>
            `px-4 py-2 rounded ${selected ? 'bg-orange-500 text-white' : 'bg-gray-200'}`
          }
        >
          Services
        </Tab>
        <Tab
          className={({ selected }) =>
            `px-4 py-2 rounded ${selected ? 'bg-orange-500 text-white' : 'bg-gray-200'}`
          }
        >
          Vision
        </Tab>
        <Tab
          className={({ selected }) =>
            `px-4 py-2 rounded ${selected ? 'bg-orange-500 text-white' : 'bg-gray-200'}`
          }
        >
          Our Team
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel className="p-4">
          The club is a team of skilled electrical engineering students offering reliable electrical services for the college community. From replacing light bulbs, sockets, and tube lights to fixing fans, switches, and regulators, they handle all electrical needs in hostel rooms. With a focus on quality and safety, they ensure a comfortable and well-functioning campus environment.
        </Tab.Panel>
        <Tab.Panel className="p-4">To be professional and highly successful club to provide quality electrical and Maintenance services in the college, </Tab.Panel>
        <Tab.Panel className="p-4">We are student of electrical department, persuing B.E Electrical engineering, we provide Maintenance services in our college </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default TabSection;
