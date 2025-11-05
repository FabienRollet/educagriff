'use client';

import { Photo } from '../types';
import { PhotoItem } from '../item/PhotoItem';
import { CollapsibleSection } from '../ui/CollapsibleSection';

interface PhotosSectionProps {
  photos: Photo[];
  isOpen: boolean;
  onToggle: () => void;
  onDelete: (id: number) => void;
  resolvedTheme?: string;
}

export const PhotosSection = ({ 
  photos, 
  isOpen, 
  onToggle, 
  onDelete, 
  resolvedTheme 
}: PhotosSectionProps) => {
  return (
    <CollapsibleSection
      title="Liste des photos"
      count={photos.length}
      isOpen={isOpen}
      onToggle={onToggle}
      resolvedTheme={resolvedTheme}
      className="mb-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {photos.length === 0 ? (
          <p className="col-span-3 text-center italic">Aucune photo trouvée</p>
        ) : (
          photos.map((photo) => (
            <PhotoItem 
              key={photo.id}
              photo={photo} 
              onDelete={onDelete}
              resolvedTheme={resolvedTheme}
            />
          ))
        )}
      </div>
    </CollapsibleSection>
  );
};