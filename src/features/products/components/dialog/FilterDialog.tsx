import React, { useEffect, useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useCategory from '../../../category/hooks/useCategory';
import { LIMITS, SORT_OPTIONS, TAGS } from '../../content/productContent';
import { ProductFilters, SortOption } from '../../hooks/useProductFilters';

type FilterDialogProps = {
  visible: boolean;
  initialFilters: ProductFilters;
  onClose: () => void;
  onApply: (payload: {
    category: string | null;
    tags: string[];
    sort: SortOption;
    limit: number;
  }) => void;
};

export default function FilterDialog({
  visible,
  initialFilters,
  onClose,
  onApply,
}: FilterDialogProps) {
  const { data } = useCategory();
  const [tempFilters, setTempFilters] = useState<ProductFilters>(() => ({
    search: '',
    category: initialFilters.category ?? null,
    tags: initialFilters.tags ?? [],
    limit: initialFilters.limit ?? 20,
    sort: initialFilters.sort ?? null,
  }));

  // sync when modal opens to reflect currently applied filters
  useEffect(() => {
    if (visible) {
      setTempFilters({
        ...tempFilters,
        category: initialFilters.category ?? null,
        tags: initialFilters.tags ?? [],
        limit: initialFilters.limit ?? 20,
        sort: initialFilters.sort ?? null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, initialFilters]);

  const toggleTag = (tag: string) => {
    setTempFilters(prev => {
      const tags = prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag];
      return { ...prev, tags };
    });
  };

  const setCategory = (category: string | null) =>
    setTempFilters(p => ({ ...p, category }));
  const setSort = (sort: SortOption) => setTempFilters(p => ({ ...p, sort }));
  const setLimit = (limit: number) => setTempFilters(p => ({ ...p, limit }));

  const reset = () => {
    setTempFilters(p => ({
      ...p,
      category: null,
      tags: [],
      sort: null,
      limit: 20,
    }));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent
    >
      <SafeAreaView style={modalStyles.safeArea}>
        <TouchableOpacity style={modalStyles.backdrop} onPress={onClose} />
        <View style={modalStyles.sheet}>
          {/* Header */}
          <View style={modalStyles.sheetHeader}>
            <Text style={modalStyles.sheetTitle}>Filters</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={modalStyles.sheetClose}>Close</Text>
            </TouchableOpacity>
          </View>

          {/* Scrollable content */}
          <ScrollView
            style={modalStyles.scrollArea}
            contentContainerStyle={modalStyles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Category */}
            <View style={modalStyles.section}>
              <Text style={modalStyles.sectionTitle}>Category</Text>
              <View style={modalStyles.optionsRow}>
                {(data || []).map(cat => {
                  const value =
                    cat.slug === 'all' ? null : cat?.slug.toLowerCase();
                  const active = (tempFilters.category ?? null) === value;
                  return (
                    <TouchableOpacity
                      key={cat?.slug}
                      style={[
                        modalStyles.chip,
                        active && modalStyles.chipActive,
                      ]}
                      onPress={() => setCategory(value)}
                    >
                      <Text
                        style={[
                          modalStyles.chipText,
                          active && modalStyles.chipTextActive,
                        ]}
                      >
                        {cat.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Tags */}
            <View style={modalStyles.section}>
              <Text style={modalStyles.sectionTitle}>Tags</Text>
              <View style={modalStyles.optionsRow}>
                {TAGS.map(tag => {
                  const active = tempFilters.tags.includes(tag);
                  return (
                    <TouchableOpacity
                      key={tag}
                      style={[
                        modalStyles.chip,
                        active && modalStyles.chipActive,
                      ]}
                      onPress={() => toggleTag(tag)}
                    >
                      <Text
                        style={[
                          modalStyles.chipText,
                          active && modalStyles.chipTextActive,
                        ]}
                      >
                        {tag}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Sort */}
            <View style={modalStyles.section}>
              <Text style={modalStyles.sectionTitle}>Sort By</Text>
              <View style={modalStyles.optionsColumn}>
                {SORT_OPTIONS.map(opt => {
                  const active = tempFilters.sort === opt.key;
                  return (
                    <TouchableOpacity
                      key={opt.key}
                      style={[
                        modalStyles.optionRow,
                        active && modalStyles.optionRowActive,
                      ]}
                      onPress={() => setSort(opt.key)}
                    >
                      <Text
                        style={[
                          modalStyles.optionText,
                          active && modalStyles.optionTextActive,
                        ]}
                      >
                        {opt.label}
                      </Text>
                      {active && <Text style={modalStyles.optionTick}>✓</Text>}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Limit */}
            <View style={modalStyles.section}>
              <Text style={modalStyles.sectionTitle}>Show per page</Text>
              <View style={modalStyles.optionsRow}>
                {LIMITS.map(l => {
                  const active = tempFilters.limit === l;
                  return (
                    <TouchableOpacity
                      key={l}
                      style={[
                        modalStyles.chip,
                        active && modalStyles.chipActive,
                      ]}
                      onPress={() => setLimit(l)}
                    >
                      <Text
                        style={[
                          modalStyles.chipText,
                          active && modalStyles.chipTextActive,
                        ]}
                      >
                        {l}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>

          {/* Footer stays fixed */}
          <View style={modalStyles.footer}>
            <TouchableOpacity style={modalStyles.resetButton} onPress={reset}>
              <Text style={modalStyles.resetText}>Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={modalStyles.applyButton}
              onPress={() =>
                onApply({
                  category: tempFilters.category,
                  tags: tempFilters.tags,
                  sort: tempFilters.sort,
                  limit: tempFilters.limit,
                })
              }
            >
              <Text style={modalStyles.applyText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const modalStyles = StyleSheet.create({
  scrollArea: {
    maxHeight: '80%',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  safeArea: { flex: 1 },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00000073',
  },
  sheet: {
    marginTop: 'auto',
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sheetTitle: { fontSize: 18, fontWeight: '700' },
  sheetClose: { color: '#CC3D3D', fontWeight: '600' },

  section: { marginTop: 12 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },

  optionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionsColumn: { flexDirection: 'column' },

  chip: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#F4F4F4',
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: { backgroundColor: '#CC3D3D' },
  chipText: { color: '#333', fontWeight: '600',textTransform:"capitalize" },
  chipTextActive: { color: '#fff' },

  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EEE',
    alignItems: 'center',
  },
  optionRowActive: { backgroundColor: '#FFF7F7' },
  optionText: { color: '#333' },
  optionTextActive: { color: '#CC3D3D', fontWeight: '700' },
  optionTick: { color: '#CC3D3D', fontWeight: '700' },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    alignItems: 'center',
  },
  resetButton: { paddingHorizontal: 12, paddingVertical: 10 },
  resetText: { color: '#8E8E8F' },
  applyButton: {
    backgroundColor: '#CC3D3D',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  applyText: { color: '#fff', fontWeight: '700' },
});
