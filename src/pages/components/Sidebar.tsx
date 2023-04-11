import { Card, Text } from '@nextui-org/react';
import { Geocache } from '../models';

interface SidebarProps {
  geocaches: Geocache[];
}

export default function Sidebar({ geocaches }: SidebarProps) {
  return (
    <div>
      <Card>
        <Card.Header>
          <Text h4>Caches within 10 miles</Text>
        </Card.Header>
        <Card.Body>
          {geocaches.length === 0 ? (
            <Text>No caches found within 10 miles of your location.</Text>
          ) : (
            geocaches.map((geocache: Geocache, index: number) => (
              <div key={index}>
                <Text>{geocache.name}</Text>
                <hr />
              </div>
            ))
          )}
        </Card.Body>
      </Card>
    </div>
  );
}