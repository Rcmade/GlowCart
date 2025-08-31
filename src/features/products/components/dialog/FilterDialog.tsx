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
import { useTheme } from '../../../../providers/theme/ThemeProvider';
import { ThemeType } from '../../../../providers/theme/themes';
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

  const { theme } = useTheme();
  const styles = createStyles(theme);
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
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} />
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Filters</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.sheetClose}>Close</Text>
            </TouchableOpacity>
          </View>

          {/* Scrollable content */}
          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Category */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Category</Text>
              <View style={styles.optionsRow}>
                {(data || []).map(cat => {
                  const value =
                    cat.slug === 'all' ? null : cat?.slug.toLowerCase();
                  const active = (tempFilters.category ?? null) === value;
                  return (
                    <TouchableOpacity
                      key={cat?.slug}
                      style={[styles.chip, active && styles.chipActive]}
                      onPress={() => setCategory(value)}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          active && styles.chipTextActive,
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
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tags</Text>
              <View style={styles.optionsRow}>
                {TAGS.map(tag => {
                  const active = tempFilters.tags.includes(tag);
                  return (
                    <TouchableOpacity
                      key={tag}
                      style={[styles.chip, active && styles.chipActive]}
                      onPress={() => toggleTag(tag)}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          active && styles.chipTextActive,
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
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sort By</Text>
              <View style={styles.optionsColumn}>
                {SORT_OPTIONS.map(opt => {
                  const active = tempFilters.sort === opt.key;
                  return (
                    <TouchableOpacity
                      key={opt.key}
                      style={[
                        styles.optionRow,
                        active && styles.optionRowActive,
                      ]}
                      onPress={() => setSort(opt.key)}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          active && styles.optionTextActive,
                        ]}
                      >
                        {opt.label}
                      </Text>
                      {active && <Text style={styles.optionTick}>✓</Text>}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Limit */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Show per page</Text>
              <View style={styles.optionsRow}>
                {LIMITS.map(l => {
                  const active = tempFilters.limit === l;
                  return (
                    <TouchableOpacity
                      key={l}
                      style={[styles.chip, active && styles.chipActive]}
                      onPress={() => setLimit(l)}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          active && styles.chipTextActive,
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
          <View style={styles.footer}>
            <TouchableOpacity style={styles.resetButton} onPress={reset}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.applyButton}
              onPress={() =>
                onApply({
                  category: tempFilters.category,
                  tags: tempFilters.tags,
                  sort: tempFilters.sort,
                  limit: tempFilters.limit,
                })
              }
            >
              <Text style={styles.applyText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    scrollArea: {
      maxHeight: '80%',
    },
    scrollContent: {
      paddingBottom: 20,
    },
    safeArea: { flex: 1 },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.overlayBlack45,
    },
    sheet: {
      marginTop: 'auto',
      backgroundColor: theme.colors.backgroundLight,
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
    sheetClose: { color: theme.colors.primaryLight, fontWeight: '600' },

    section: { marginTop: 12 },
    sectionTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.colors.textSecondary,
      marginBottom: 8,
    },

    optionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    optionsColumn: { flexDirection: 'column' },

    chip: {
      paddingHorizontal: 8,
      paddingVertical: 8,
      borderRadius: 999,
      backgroundColor: theme.colors.surfaceLight,
      marginRight: 8,
      marginBottom: 8,
    },
    chipActive: { backgroundColor: theme.colors.primaryLight },
    chipText: {
      color: theme.colors.textSecondary,
      fontWeight: '600',
      textTransform: 'capitalize',
    },
    chipTextActive: { color: theme.colors.backgroundLight },

    optionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.surfaceLight,
      alignItems: 'center',
    },
    optionRowActive: { backgroundColor: theme.colors.backgroundWarmLight },
    optionText: { color: theme.colors.textSecondary },
    optionTextActive: { color: theme.colors.primaryLight, fontWeight: '700' },
    optionTick: { color: theme.colors.primaryLight, fontWeight: '700' },

    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 16,
      alignItems: 'center',
    },
    resetButton: { paddingHorizontal: 12, paddingVertical: 10 },
    resetText: { color: theme.colors.textDisabled },
    applyButton: {
      backgroundColor: theme.colors.primaryLight,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 10,
    },
    applyText: { color: theme.colors.backgroundLight, fontWeight: '700' },
  });
